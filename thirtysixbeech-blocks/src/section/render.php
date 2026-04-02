<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$allowed_tags = [ 'section', 'header', 'footer', 'div', 'article' ];
$raw_tag      = $attributes['tag'] ?? 'section';
$tag          = in_array( $raw_tag, $allowed_tags, true ) ? $raw_tag : 'section';
?>
<<?php echo esc_attr( $tag ); ?> <?php echo get_block_wrapper_attributes(); ?>>
	<div><?php echo $content; ?></div>
</<?php echo esc_attr( $tag ); ?>>
