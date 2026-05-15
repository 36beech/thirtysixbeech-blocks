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
$gap = $block->context["thirtysixbeech/blockGap"] ?? null;
$even_columns = $block->context["thirtysixbeech/evenColumns"] ?? null;

$image_id = $attributes["imageId"] ?? null;
$product_tag = $attributes["productTag"] ?? null;
$product_title = $attributes["productTitle"] ?? null;
$product_description = $attributes["productDescription"] ?? null;

$styles = array();
$classes = array("tsb-card");

if ($gap) :
	$styles[] = "margin-left: " . $gap;
	$styles[] = "margin-right: " . $gap;
endif;

if ($even_columns) :
	$classes[] = "flex-1";
endif;

$product_image = $image_id ? wp_get_attachment_image(
	$image_id,
	'medium',
	false,
	['class' => 'w-full h-full object-cover relative z-0', 'loading' => 'lazy', 'decoding' => 'async']
) : null;

?>
<div <?php echo get_block_wrapper_attributes(array(
				"style" => implode(";", $styles),
				"class" => implode(" ", $classes)
			)); ?>>
	<div class="max-md:flex max-md:flex-col md:grid grid-cols-12 gap-4">
		<div class="relative col-span-7">
			
			<?php if ($product_image): ?>
			<div class="h-full relative z-0">
				<?php echo $product_image; ?>
			</div>
			<?php endif; ?>

			<div class="absolute top-0 left-0 z-10">
				<div class="product-hero-header">
					<?php if( $product_tag ) : ?><div class="product-hero-header__tag"><?php echo $product_tag; ?></div><?php endif; ?>
					<?php if( $product_tag ) : ?><h2 class="product-hero-header__title"><?php echo $product_title; ?></h2><?php endif; ?>
					<?php if( $product_tag ) : ?><div class="product-hero-header__description"><?php echo $product_description; ?></div><?php endif; ?>
				</div>
			</div>

		</div>

		<div class="col-span-5">
			<?php echo $content; ?>
		</div>
	</div>
</div>
<?php
/*
<div <?php echo get_block_wrapper_attributes( array( 
	"style" => implode( ";", $styles ),
	"class" => implode( " ", $classes )
) ); ?>>
	<div class="tsb-card-image">
		<?php echo $card_image; ?>
	</div>
	<?php if( ! empty( $tags ) ): ?>
	<div class="tsb-card-tag">
		<ul>
		<?php foreach( $tags as $tag ): ?>
			<li><?php echo $tag; ?></li>
		<?php endforeach; ?>
		</ul>
	</div>
	<?php endif; ?>
	<div class="tsb-card-body">
		<?php echo $content; ?>
	</div>
</div>
*/