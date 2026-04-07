<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$breakpoint = $attributes['breakpoint'];
$breakpoint_classes = [
	"mobile" => "max-sm:flex max-sm:flex-col sm:grid",
	"tablet" => "max-md:flex max-md:flex-col md:grid",
	"desktop" => "max-lg:flex max-lg:flex-col lg:grid"
];
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="<?php echo $breakpoint_classes[$breakpoint]; ?> grid-cols-12 gap-5">
		<?php echo $content; ?>
	</div>
</div>
