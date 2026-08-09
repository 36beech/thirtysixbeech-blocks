<?php
/**
 * Helpers for safely reading and inlining SVG attachments.
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function thirtysixbeech_blocks_is_svg_attachment( $attachment_id ) {
	return $attachment_id && 'image/svg+xml' === get_post_mime_type( $attachment_id );
}

/**
 * Reads an SVG attachment from disk and returns its sanitized markup.
 *
 * @param int $attachment_id Attachment ID.
 * @return string Sanitized SVG markup, or '' if the attachment isn't a
 *                readable SVG or fails sanitization.
 */
function thirtysixbeech_blocks_get_svg_markup( $attachment_id ) {
	if ( ! thirtysixbeech_blocks_is_svg_attachment( $attachment_id ) ) {
		return '';
	}

	$path = get_attached_file( $attachment_id );

	if ( ! $path || ! file_exists( $path ) ) {
		return '';
	}

	$svg = file_get_contents( $path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents

	if ( false === $svg ) {
		return '';
	}

	return thirtysixbeech_blocks_sanitize_svg( $svg );
}

/**
 * Strips an SVG string down to a safe element/attribute allowlist.
 *
 * Removes script-capable elements (script, foreignObject, animate*, a, etc.),
 * event handler attributes (onload, onclick, ...), non-fragment href/xlink:href
 * values, and javascript:/data: URIs. Also rejects malformed XML and any
 * doctype declaration (XXE hardening).
 *
 * @param string $svg Raw SVG markup.
 * @return string Sanitized SVG markup, or '' if the input isn't usable.
 */
function thirtysixbeech_blocks_sanitize_svg( $svg ) {
	$svg = trim( (string) $svg );

	if ( '' === $svg ) {
		return '';
	}

	$allowed_tags = array(
		'svg',
		'g',
		'defs',
		'title',
		'desc',
		'metadata',
		'symbol',
		'use',
		'path',
		'rect',
		'circle',
		'ellipse',
		'line',
		'polyline',
		'polygon',
		'text',
		'tspan',
		'textPath',
		'linearGradient',
		'radialGradient',
		'stop',
		'clipPath',
		'mask',
		'pattern',
		'marker',
		'style',
	);

	$allowed_attributes = array(
		'id',
		'class',
		'style',
		'transform',
		'viewBox',
		'preserveAspectRatio',
		'xmlns',
		'xmlns:xlink',
		'version',
		'width',
		'height',
		'x',
		'y',
		'x1',
		'y1',
		'x2',
		'y2',
		'cx',
		'cy',
		'r',
		'rx',
		'ry',
		'points',
		'd',
		'fill',
		'fill-rule',
		'fill-opacity',
		'stroke',
		'stroke-width',
		'stroke-linecap',
		'stroke-linejoin',
		'stroke-dasharray',
		'stroke-opacity',
		'opacity',
		'offset',
		'stop-color',
		'stop-opacity',
		'gradientUnits',
		'gradientTransform',
		'spreadMethod',
		'patternUnits',
		'patternContentUnits',
		'patternTransform',
		'clip-path',
		'clip-rule',
		'mask',
		'marker-start',
		'marker-mid',
		'marker-end',
		'font-family',
		'font-size',
		'font-weight',
		'text-anchor',
		'dominant-baseline',
		'role',
		'aria-hidden',
		'aria-label',
		'focusable',
		'name',
		'href',
		'xlink:href',
	);

	$previous_use_errors = libxml_use_internal_errors( true );

	// PHP < 8 doesn't disable external entity loading by default; PHP 8+ always does.
	$previous_entity_loader = null;
	if ( PHP_VERSION_ID < 80000 && function_exists( 'libxml_disable_entity_loader' ) ) {
		$previous_entity_loader = libxml_disable_entity_loader( true ); // phpcs:ignore PHPCompatibility.FunctionUse.RemovedFunctions.libxml_disable_entity_loaderDeprecated
	}

	$dom    = new DOMDocument();
	$loaded = $dom->loadXML( $svg, LIBXML_NONET | LIBXML_NOBLANKS );

	libxml_clear_errors();
	libxml_use_internal_errors( $previous_use_errors );
	if ( null !== $previous_entity_loader ) {
		libxml_disable_entity_loader( $previous_entity_loader ); // phpcs:ignore PHPCompatibility.FunctionUse.RemovedFunctions.libxml_disable_entity_loaderDeprecated
	}

	if ( ! $loaded || ! $dom->documentElement || 'svg' !== $dom->documentElement->tagName ) {
		return '';
	}

	foreach ( $dom->childNodes as $child ) {
		if ( XML_DOCUMENT_TYPE_NODE === $child->nodeType ) {
			return '';
		}
	}

	thirtysixbeech_blocks_svg_strip_node( $dom->documentElement, $allowed_tags, $allowed_attributes );

	if ( ! $dom->documentElement ) {
		return '';
	}

	return $dom->saveXML( $dom->documentElement );
}

/**
 * Recursively strips disallowed elements/attributes from an SVG DOM node in place.
 *
 * @param DOMNode $node               Node to sanitize.
 * @param array   $allowed_tags       Allowlisted element names.
 * @param array   $allowed_attributes Allowlisted attribute names.
 */
function thirtysixbeech_blocks_svg_strip_node( $node, array $allowed_tags, array $allowed_attributes ) {
	if ( XML_COMMENT_NODE === $node->nodeType || XML_PI_NODE === $node->nodeType ) {
		$node->parentNode->removeChild( $node );
		return;
	}

	if ( XML_ELEMENT_NODE !== $node->nodeType ) {
		return;
	}

	// Snapshot children before recursing since we may remove nodes as we go.
	if ( $node->hasChildNodes() ) {
		foreach ( iterator_to_array( $node->childNodes ) as $child ) {
			thirtysixbeech_blocks_svg_strip_node( $child, $allowed_tags, $allowed_attributes );
		}
	}

	if ( ! in_array( $node->tagName, $allowed_tags, true ) ) {
		$node->parentNode->removeChild( $node );
		return;
	}

	if ( ! $node->hasAttributes() ) {
		return;
	}

	foreach ( iterator_to_array( $node->attributes ) as $attribute ) {
		$name  = $attribute->nodeName;
		$value = $attribute->nodeValue;

		$is_event_handler = 0 === stripos( $name, 'on' );
		$is_href_attr      = in_array( strtolower( $name ), array( 'href', 'xlink:href' ), true );
		$is_unsafe_href    = $is_href_attr && 0 !== strpos( trim( $value ), '#' );
		$has_unsafe_scheme = (bool) preg_match( '/^\s*(javascript|data):/i', $value );
		$is_unsafe_style   = 'style' === strtolower( $name )
			&& preg_match( '/expression\s*\(|javascript\s*:|@import/i', $value );

		if (
			! in_array( $name, $allowed_attributes, true )
			|| $is_event_handler
			|| $is_unsafe_href
			|| $has_unsafe_scheme
			|| $is_unsafe_style
		) {
			$node->removeAttribute( $name );
		}
	}
}
