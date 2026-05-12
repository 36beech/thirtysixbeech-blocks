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
$stinger = $attributes["stinger"];
$card_image = $image_id ? wp_get_attachment_image(
	$image_id,
	'full',
	false,
	['class' => '', 'loading' => 'lazy', 'decoding' => 'async']
) : "";
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="grid grid-cols-12 image-and-text-content">
		<div class="col-span-8">
			<?php echo $card_image; ?>
		</div>
		<div class="col-span-4">
			<div class="h-full flex flex-col">
				<div class="image-and-text-stinger text-right">
					<?php echo $stinger; ?>
				</div>
				<div class="grow flex flex-col justify-center image-and-text-content">
					<?php echo $content; ?>
				</div>
			</div>
		</div>
	</div>
</div>