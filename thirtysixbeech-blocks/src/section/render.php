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
$raw_tag      = $attributes['semanticTag'] ?? 'section';
$tag          = in_array( $raw_tag, $allowed_tags, true ) ? $raw_tag : 'section';

$has_partial_background = $attributes["hasPartialBackground"] ?? false;
$partial_background_color = $attributes["partialBackgroundColor"] ?? null;
$partial_background_coverage = $attributes["partialBackgroundCoverage"] ?? 50;
?>
<<?php echo esc_attr( $tag ); ?> <?php echo get_block_wrapper_attributes( array( "class" => "relative" ) ); ?>>
	<div class="relative z-10"><?php echo $content; ?></div>
	<?php if($has_partial_background ): ?>
	<div class="absolute w-full bottom-0 left-0 z-0" style="height: <?php echo $partial_background_coverage; ?>%; background: <?php echo $partial_background_color; ?>;"></div>
	<?php endif; ?>
</<?php echo esc_attr( $tag ); ?>>
