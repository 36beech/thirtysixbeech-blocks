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
require_once(__DIR__ . "/../shared/includes/hero.php");

function setFocalPoint($focal_point_option)
{
	if (empty($focal_point_option)) return "50% 50%";
	$x = $focal_point_option["x"] ?? 0.5;
	$y = $focal_point_option["y"] ?? 0.5;

	$x_pct = $x * 100;
	$y_pct = $y * 100;

	return "{$x_pct}% {$y_pct}%";
}

$background_image = get_post_thumbnail_id();
$post_id = get_queried_object_id();

$focal_point_option = get_post_meta($post_id, 'tsb-featured-focal-point', true) ?? array("x" => 0.5, "y" => 0.5);
$focal_point = setFocalPoint($focal_point_option);

$heading = $content;
?>
<div <?php echo get_block_wrapper_attributes(array("style" => "--hero-position: {$focal_point}")); ?>>
	<?php echo hero($background_image, $heading, ''); ?>
</div>