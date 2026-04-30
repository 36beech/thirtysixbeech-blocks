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
$gap = $block->context["thirtysixbeech/blockGap"];
$even_columns = $block->context["thirtysixbeech/evenColumns"];

$styles = array();
$classes = array( "tsb-card" );

if( $gap ) :
	$styles[] = "margin-left: " . $gap;
	$styles[] = "margin-right: " . $gap;
endif;

if( $attributes["variant"] === "horizontal" ) :
	$classes[] = "tsb-card-horizontal";
endif;

if( $even_columns ) :
	$classes[] = "flex-1";
endif;

$image_id = $attributes["imageId"];
$tags = $attributes["tags"];

$card_image = $image_id ? wp_get_attachment_image(
	$image_id,
	'full',
	false,
	['class' => '', 'loading' => 'lazy', 'decoding' => 'async']
) : "";

?>
<div <?php echo get_block_wrapper_attributes( array( 
	"style" => implode( ";", $styles ),
	"class" => implode( " ", $classes )
) ); ?>>
	<div className="tsb-card-image">
		<?php echo $card_image; ?>
	</div>
	<?php if( ! empty( $tags ) ): ?>
	<div className="tsb-card-tag">
		<ul>
		<?php foreach( $tags as $tag ): ?>
			<li><?php echo $tag; ?></li>
		<?php endforeach; ?>
		</ul>
	</div>
	<?php endif; ?>
	<div className="tsb-card-body">
		<?php echo $content; ?>
	</div>
</div>
