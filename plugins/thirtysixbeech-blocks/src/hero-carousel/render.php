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

$heros = array();

foreach ($block->inner_blocks as $hero_block) {
	$heros[] = array(
		'background_image'	=> $hero_block->attributes['backgroundImage'] ?? null,
		'heading'						=> !empty($hero_block->attributes['heading']) ? '<h2 class="tsb-hero__heading">' . esc_html($hero_block->attributes['heading']) . '</h2>' : '',
		'description'				=> !empty($hero_block->attributes['description']) ? '<p class="tsb-hero__description">' . esc_html($hero_block->attributes['description']) . '</p>' : '',
	);
}

$options = array(
	"effect" => "fade",
	"autoplay" => array(
		"delay" => 3000,
		"disableOnInteraction" => false
	)
);
?>
<header <?php echo get_block_wrapper_attributes(array("class" => "tsb-multislider", "data-slider-options" => json_encode($options))); ?>>
	<div class="tsb-hero relative z-0 grid grid-cols-1 grid-rows-1">
		<div class="tsb-hero__image relative z-0 col-start-1 row-start-1">
			<div class="__images swiper">
				<div class="swiper-wrapper">
					<?php foreach ($heros as $hero):
						$background_url = $hero['background_image'] ? wp_get_attachment_image_url($hero['background_image'], 'full') : '';
					?>
						<img
							src="<?php echo esc_url($background_url); ?>"
							alt=""
							class="swiper-slide block relative z-0 w-full h-full object-cover object-center"
							loading="lazy"
							decoding="async" />
					<?php endforeach; ?>
				</div>
			</div>
		</div>
		<span class="tsb-hero__overlay absolute z-10 top-0 left-0 w-full h-full"></span>
		<div class="tsb-hero__body px-5 is-layout-constrained relative z-20 col-start-1 row-start-1">
			<div class="tsb-hero__body-container">
				<div class="tsb-hero__body-inner __body swiper">
					<div class="swiper-wrapper">
						<?php foreach ($heros as $hero): ?>
							<div class="swiper-slide">
								<?php if ($hero['heading']) : ?>
									<?php echo $hero['heading']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
									?>
								<?php endif; ?>
								<?php if ($hero['description']) : ?>
									<?php echo $hero['description']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
									?>
								<?php endif; ?>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
				<div class="flex gap-2 my-4">
					<!-- <div class="wp-block-button is-style-link"><button class="tsb-hero-carousel__prev __prev wp-block-button__link wp-element-button text-white">Prev</button></div> -->
					<div class="tsb-carousel__navigation tsb-hero-carousel__pagination __pagination swiper-pagination"></div>
					<!-- <div class="wp-block-button is-style-link"><button class="tsb-hero-carousel__next __next wp-block-button__link wp-element-button text-white">Next</button></div> -->
				</div>
			</div>
		</div>
	</div>
</header>