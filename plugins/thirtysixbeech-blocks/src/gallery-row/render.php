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

$image1 = $attributes["image1"] ?? null;
$image2 = $attributes["image2"] ?? null;
$image3 = $attributes["image3"] ?? null;

$image1_html = $image1 ? image_html($image1) : "";
$image2_html = $image2 ? image_html($image2) : "";
$image3_html = $image3 ? image_html($image3) : "";

$image_list = array();

switch ($columns):
	case 1:
		$num_imgs = 1;
		break;
	case 2:
	case "33/66":
	case "66/33":
		$num_imgs = 2;
		break;
	case "33/66/2":
	case "66/33/2":
		$num_imgs = 3;
		break;
endswitch;

$image_atts = array('url', 'mime_type', 'srcset', 'sizes_attr', 'alt', 'title', 'caption', 'description');

if ($image1) $image_list[] = image_info($image1, $image_atts);
if ($image2 && ($num_imgs === 2 || $num_imgs === 3)) $image_list[] = image_info($image2, $image_atts);
if ($image3 && $num_imgs === 3) $image_list[] = image_info($image3, $image_atts);

$row_class = ($columns === "33/66/2" || $columns === "66/33/2") ? " grid-rows-2" : "";
?>
<div <?php echo get_block_wrapper_attributes(array("class" => "tsb-gallery-row grid grid-cols-12{$row_class} gap-tsb py-tsb-half max-sm:flex max-sm:flex-col", "data-images" => json_encode($image_list))); ?>>

	<?php if ($columns === 1) : ?>
		<div class="col-span-12">
			<div class="tsb-gallery-row__image image-full-col"><a href="<?php echo $image_list[0]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image1_html; ?></a></div>
		</div>
	<?php endif; ?>

	<?php if ($columns === 2) : ?>
		<div class="col-span-6">
			<div class="tsb-gallery-row__image image-50-col"><a href="<?php echo $image_list[0]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image1_html; ?></a></div>
		</div>
		<div class="col-span-6">
			<div class="tsb-gallery-row__image image-50-col"><a href="<?php echo $image_list[1]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image2_html; ?></a></div>
		</div>
	<?php endif; ?>

	<?php if ($columns === "33/66") : ?>
		<div class="col-span-4">
			<div class="tsb-gallery-row__image image-33-col"><a href="<?php echo $image_list[0]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image1_html; ?></a></div>
		</div>
		<div class="col-span-8">
			<div class="tsb-gallery-row__image image-66-col"><a href="<?php echo $image_list[1]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image2_html; ?></a></div>
		</div>
	<?php endif; ?>

	<?php if ($columns === "66/33") : ?>
		<div class="col-span-8">
			<div class="tsb-gallery-row__image image-66-col"><a href="<?php echo $image_list[0]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image1_html; ?></a></div>
		</div>
		<div class="col-span-4">
			<div class="tsb-gallery-row__image image-33-col"><a href="<?php echo $image_list[1]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image2_html; ?></a></div>
		</div>
	<?php endif; ?>

	<?php if ($columns === "33/66/2") : ?>
		<div class="col-span-8 row-span-2 col-start-5 row-start-1">
			<div class="tsb-gallery-row__image image-66-2-col"><a href="<?php echo $image_list[0]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image1_html; ?></a></div>
		</div>
		<div class="col-span-4">
			<div class="tsb-gallery-row__image image-33-1-col col-start-1 row-start-1"><a href="<?php echo $image_list[1]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image2_html; ?></a></div>
		</div>
		<div class="col-span-4">
			<div class="tsb-gallery-row__image image-33-1-col col-start-1 row-start-2"><a href="<?php echo $image_list[2]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image3_html; ?></a></div>
		</div>
	<?php endif; ?>

	<?php if ($columns === "66/33/2") : ?>
		<div class="col-span-8 row-span-2">
			<div class="tsb-gallery-row__image image-66-2-col"><a href="<?php echo $image_list[0]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image1_html; ?></a></div>
		</div>
		<div class="col-span-4">
			<div class="tsb-gallery-row__image image-33-1-col"><a href="<?php echo $image_list[1]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image2_html; ?></a></div>
		</div>
		<div class="col-span-4">
			<div class="tsb-gallery-row__image image-33-1-col"><a href="<?php echo $image_list[2]['url']; ?>" class="tsb-gallery-row__image-link" target="_blank"><?php echo $image3_html; ?></a></div>
		</div>
	<?php endif; ?>

</div>