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

if (empty($block->parsed_block["innerBlocks"])) {
	return;
}

$child_blocks = $block->parsed_block["innerBlocks"];
$images = array_map(fn($block) => wp_get_attachment_image(
	$block['attrs']['imageId'],
	'medium',
	false,
	['class' => 'z-10 w-full h-full object-cover object-center top-0 left-0 bg-transparent border-0', 'loading' => 'lazy', 'decoding' => 'async']
) ?? null, $child_blocks);



$carousel_settings = array();

if ($attributes["autoPlay"]) :
	$carousel_settings["autoplay"] = array(
		"delay" => $attributes["autoPlayDelay"],
		"disableOnInteraction" => true,
	);
endif;

$carousel_data = ! empty( $carousel_settings ) ? " data-carousel-settings='" . json_encode( $carousel_settings ) . "'" : "";
?>
<header <?php echo get_block_wrapper_attributes(array("class" => "relative")); ?>>
	<div class="has-global-padding is-layout-constrained relative z-10">
		<div class="grid grid-cols-12 gap-5">
			<div class="col-span-12 md:col-span-6 lg:col-span-5 homepage-carousel__text-slides-container">

				<div class="homepage-carousel__text-slides overflow-hidden"<?php echo $carousel_data; ?>>
					<div class="swiper-wrapper">
						<!-- content slides -->
						<?php foreach ($child_blocks as $child_block) : ?>
						<div class="swiper-slide homepage-carousel__text-slide">
						<?php foreach ($child_block["innerBlocks"] as $grandchild_block) :
							echo (new WP_Block($grandchild_block))->render();
						endforeach; ?>
						</div>
						<?php endforeach; ?>
						<!-- content slides -->
					</div>
					<div class="swiper-pagination"></div>
				</div>

			</div>
		</div>
	</div>
	<div class="homepage-carousel__image-slides-container absolute top-0 left-0 w-full h-full bg-amber-100 z-0 m-0 overflow-hidden">
    <div class="swiper-wrapper">
		  <?php foreach( $images as $image ) : ?>
				<div class="swiper-slide homepage-carousel__image-slide">
					<?php echo $image; ?>
			  </div>
			<?php endforeach; ?>
		</div>
	</div>
</header>