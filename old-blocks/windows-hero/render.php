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
$hero_tag = $attributes["heroTag"];
$hero_title = $attributes["heroTitle"];
$hero_description = $attributes["heroDescription"];
$hero_image = $image_id ? wp_get_attachment_image(
	$image_id,
	'medium',
	false,
	['class' => 'w-full h-full object-cover relative z-0', 'loading' => 'lazy', 'decoding' => 'async']
) : "";

?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="md:aspect-[1440/424] max-md:min-h-80 grid grid-cols-1 grid-rows-2"> 
		<?php if ($hero_image): ?>
		 <div class="relative z-0 row-start-1 row-span-2 col-start-1">
			<?php echo $hero_image; ?>
		</div>
		<?php endif; ?>
		<div class="row-start-2 col-start-1 relative z-10 is-layout-constrained has-global-padding self-end">
			<div>
				<div class="windows-hero-header">
					<div class="windows-hero-header__tag"><?php echo $hero_tag; ?></div>
					<h2 class="windows-hero-header__title"><?php echo $hero_title; ?></h2>
					<div class="windows-hero-header__description"><?php echo $hero_description; ?></div>
				</div>
			</div>
		</div>
</div>