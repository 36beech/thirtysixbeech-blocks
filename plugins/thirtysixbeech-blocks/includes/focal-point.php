<?php
/**
 * Featured image focal point.
 *
 * Stores the focal point chosen in the editor as post meta `tsb-featured-focal-point`
 * (array with `x` and `y` between 0 and 1, default centered) for every post type that
 * supports featured images. The editor UI lives in
 * src/editor-plugins/featured-focal-point. Nothing on the front end reads it yet.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Clamp a focal point to the 0..1 range, falling back to the center.
 *
 * @param mixed $value
 * @return array{x: float, y: float}
 */
function thirtysixbeech_blocks_sanitize_focal_point( $value ) {
	$value = is_array( $value ) ? $value : array();

	$clamp = function ( $n ) {
		return is_numeric( $n ) ? max( 0, min( 1, (float) $n ) ) : 0.5;
	};

	return array(
		'x' => $clamp( $value['x'] ?? 0.5 ),
		'y' => $clamp( $value['y'] ?? 0.5 ),
	);
}

function thirtysixbeech_blocks_register_focal_point_meta() {
	foreach ( get_post_types_by_support( 'thumbnail' ) as $post_type ) {
		// Meta is only exposed to the editor (REST) for post types that support custom fields.
		if ( ! post_type_supports( $post_type, 'custom-fields' ) ) {
			continue;
		}

		register_post_meta(
			$post_type,
			'tsb-featured-focal-point',
			array(
				'single'            => true,
				'type'              => 'object',
				'default'           => array(
					'x' => 0.5,
					'y' => 0.5,
				),
				'show_in_rest'      => array(
					'schema' => array(
						'type'                 => 'object',
						'properties'           => array(
							'x' => array( 'type' => 'number' ),
							'y' => array( 'type' => 'number' ),
						),
						'additionalProperties' => false,
					),
				),
				'sanitize_callback' => 'thirtysixbeech_blocks_sanitize_focal_point',
				'auth_callback'     => function ( $allowed, $meta_key, $post_id ) {
					return current_user_can( 'edit_post', $post_id );
				},
			)
		);
	}
}
// Late, so custom post types registered by themes and plugins are included.
add_action( 'init', 'thirtysixbeech_blocks_register_focal_point_meta', 99 );

function thirtysixbeech_blocks_enqueue_focal_point_editor() {
	$asset_file = plugin_dir_path( THIRTYSIXBEECH_BLOCKS_FILE ) . 'build/editor-plugins/featured-focal-point/index.asset.php';
	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = require $asset_file;

	wp_enqueue_script(
		'thirtysixbeech-blocks-featured-focal-point',
		plugin_dir_url( THIRTYSIXBEECH_BLOCKS_FILE ) . 'build/editor-plugins/featured-focal-point/index.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
add_action( 'enqueue_block_editor_assets', 'thirtysixbeech_blocks_enqueue_focal_point_editor' );
