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
$image2 = $attributes["image2"] ?? null;
$image3 = $attributes["image3"] ?? null;
$image4 = $attributes["image4"] ?? null;
$reversed = $attributes["reversed"] ?? false;
$image_layout = $attributes["imageLayout"] ?? "1x1";

$image_attr = array(
	"class" => "w-full h-full object-cover"
);

$attachment = !empty($image) ? wp_get_attachment_image($image, 'full', false, $image_attr) : null;
$attachment2 = !empty($image2) ? wp_get_attachment_image($image2, 'full', false, $image_attr) : null;
$attachment3 = !empty($image3) ? wp_get_attachment_image($image3, 'full', false, $image_attr) : null;
$attachment4 = !empty($image4) ? wp_get_attachment_image($image4, 'full', false, $image_attr) : null;
?>
<div <?php echo get_block_wrapper_attributes(array("class" => "flex flex-col-reverse md:grid md:items-center grid-cols-12 gap-tsb tsb-image-text")); ?>>
	<div class="col-span-5 lg:col-span-4 <?php if ($reversed) echo "col-start-8 lg:col-start-9 row-start-1 "; ?>tsb-image-text__text-column"><?php echo $content; ?></div>
	<div class="col-span-7 lg:col-span-8 <?php if ($reversed) echo "col-start-1 lg:col-start-1 row-start-1 "; ?>tsb-image-text__image-column">
		<?php if ($image_layout === "2x2") : ?><div class="grid grid-cols-2 grid-rows-2 gap-tsb-half lg:gap-tsb"><?php endif; ?>
			<div><?php echo $attachment; ?></div>
			<?php if ($image_layout === "2x2") : ?>
				<div><?php echo $attachment2; ?></div>
				<div><?php echo $attachment3; ?></div>
				<div><?php echo $attachment4; ?></div>
			<?php endif; ?>
			<?php if ($image_layout === "2x2") : ?>
			</div><?php endif; ?>
	</div>
</div>