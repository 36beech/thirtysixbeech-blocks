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
$classes = array();

if( $gap ) :
	$styles[] = "margin-left: " . $gap;
	$styles[] = "margin-right: " . $gap;
endif;

if( $even_columns ) :
	$classes[] = "flex-1";
endif;
?>
<div <?php echo get_block_wrapper_attributes( array( 
	"style" => implode( ";", $styles ),
	"class" => implode( " ", $classes )
) ); ?>>
	<?php echo $content; ?>
</div>
