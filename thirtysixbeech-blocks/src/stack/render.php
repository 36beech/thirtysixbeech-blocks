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
$flex_classes = array(
	"all" =>"flex",
	"sm" =>"sm:flex",
	"md" =>"md:flex",
	"lg" =>"lg:flex",
	"xl" =>"xl:flex",
);

$classes = array( 
	$flex_classes[ $attributes[ "breakpoint" ] ],
	$attributes["alignItems"],
	$attributes["justifyContent"],
	$attributes["reverse"] ? "flex-row-reverse" : "flex-row"
);

$styles = $attributes["blockGap"] ? array(
	"margin-left: calc(" . $attributes["blockGap"] . " * -1)",
	"margin-right: calc(" . $attributes["blockGap"] . " * -1)" 
) : array();
?>
<div <?php echo get_block_wrapper_attributes( array( "class" => implode( " ", $classes ), "style" => implode( ";", $styles ) ) ); ?>>
	<?php echo $content; ?>
</div>
