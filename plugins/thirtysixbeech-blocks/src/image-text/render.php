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

$image = $attributes["backgroundImage"] ?? null;
$attachment = !empty($image) ? wp_get_attachment_image($image, 'full') : null;
?>
<div <?php echo get_block_wrapper_attributes(array("class" => "flex flex-col-reverse md:grid md:items-center grid-cols-12 gap-tsb")); ?>>
	<div class="col-span-4"><?php echo $content; ?></div>
	<div class="col-span-8"><?php echo $attachment; ?></div>
</div>