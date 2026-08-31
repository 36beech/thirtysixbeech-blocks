<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$col_span = max( $attributes["colSpan"] - 1, 0 );
$col_start = max( $attributes["colStart"] - 1, 0 );

$rowSpan = $attributes["rowSpan"];
$rowStart = $attributes["rowStart"];

$col_spanClasses = ["", "col-span-2", "col-span-3", "col-span-4", "col-span-5", "col-span-6", "col-span-7", "col-span-8", "col-span-9", "col-span-10", "col-span-11", "col-span-12"];
$col_startClasses = ["", "col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6", "col-start-7", "col-start-8", "col-start-9", "col-start-10", "col-start-11", "col-start-12"];

$classes = [$col_spanClasses[$col_span], $col_startClasses[$col_start]];

// $itemStyle = "";
// if( $rowStart ) { $itemStyle .= "grid-row-start: " . $rowStart; }
// if( $rowSpan ) { $itemStyle .= "grid-row: span " . $rowSpan; }
?>
<div <?php echo get_block_wrapper_attributes(['class' => implode(" ", $classes)]); ?>>
	<?php echo $content; ?>
</div>
