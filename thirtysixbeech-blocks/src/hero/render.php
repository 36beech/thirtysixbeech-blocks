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
$image_id = $attributes["imageId"];
$hero_image = $image_id ? wp_get_attachment_image(
    $image_id,
    'medium',
    false,
    ['class' => 'z-10 w-full h-full top-0 left-0 bg-transparent border-0', 'loading' => 'lazy', 'decoding' => 'async']
  ) : "";
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="tsb-hero-image">
		<?php echo $hero_image; ?>
	</div>
	<div class="tsb-hero-content">
		<?php echo $content; ?><pre>
	</div>
</div>
