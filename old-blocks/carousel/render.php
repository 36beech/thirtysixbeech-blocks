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

$carousel_settings = array();

if ($attributes["autoPlay"]) :
	$carousel_settings["autoplay"] = array(
		"delay" => $attributes["autoPlayDelay"],
		"disableOnInteraction" => true,
	);
endif;

$block_attributes = array(
	"class" => "swiper"
);

if( ! empty( $carousel_settings ) ) :
	$block_attributes["data-carousel-settings"] = json_encode( $carousel_settings );
endif;

?>
<div <?php echo get_block_wrapper_attributes( $block_attributes ); ?>>
	<div class="swiper-wrapper">
		<?php echo $content; ?>
	</div>
	<div class="swiper-pagination"></div>
</div>