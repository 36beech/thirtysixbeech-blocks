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
require_once(__DIR__ . "/../shared/includes/util.php");
$columns = $attributes["columns"];

$image1_html = image_html($attributes["image1"]);
$image2_html = image_html($attributes["image2"]);
?>
<div <?php echo get_block_wrapper_attributes(array("class" => "tsb-gallery-row grid grid-cols-12 gap-tsb py-tsb-half max-sm:flex max-sm:flex-col")); ?>>

	<?php if ($columns === 1) : ?>
		<div class="col-span-12">
			<div class="tsb-gallery-row__image image-full-col"><?php echo $image1_html; ?></div>
		</div>
	<?php endif; ?>

	<?php if ($columns === 2) : ?>
		<div class="col-span-6">
			<div class="tsb-gallery-row__image image-50-col"><?php echo $image1_html; ?></div>
		</div>
		<div class="col-span-6">
			<div class="tsb-gallery-row__image image-50-col"><?php echo $image2_html; ?></div>
		</div>
	<?php endif; ?>

	<?php if ($columns === "33/66") : ?>
		<div class="col-span-4">
			<div class="tsb-gallery-row__image image-33-col"><?php echo $image1_html; ?></div>
		</div>
		<div class="col-span-8">
			<div class="tsb-gallery-row__image image-66-col"><?php echo $image2_html; ?></div>
		</div>
	<?php endif; ?>

	<?php if ($columns === "66/33") : ?>
		<div class="col-span-8">
			<div class="tsb-gallery-row__image image-66-col"><?php echo $image1_html; ?></div>
		</div>
		<div class="col-span-4">
			<div class="tsb-gallery-row__image image-33-col"><?php echo $image2_html; ?></div>
		</div>
	<?php endif; ?>

</div>