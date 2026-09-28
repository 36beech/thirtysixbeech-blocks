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
?>
<div <?php echo get_block_wrapper_attributes(array("class" => "tsb-carousel")); ?>>
	<div class="tsb-carousel__slider swiper">
		<div class="swiper-wrapper items-center">
			<?php foreach ($block->inner_blocks as $inner_block): ?>
				<div class="swiper-slide"><?php echo $inner_block->render(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				?></div>
			<?php endforeach; ?>
		</div>
	</div>
	<div class="flex gap-2 my-4 justify-center">
		<div class="wp-block-button is-style-link"><button class="tsb-carousel__prev wp-block-button__link wp-element-button">Prev</button></div>
		<div class="tsb-carousel__pagination swiper-pagination"></div>
		<div class="wp-block-button is-style-link"><button class="tsb-carousel__next wp-block-button__link wp-element-button">Next</button></div>
	</div>
</div>
