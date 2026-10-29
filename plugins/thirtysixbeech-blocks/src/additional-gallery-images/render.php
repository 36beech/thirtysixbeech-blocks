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
require_once(__DIR__ . "/../shared/includes/util.php");
$images = $attributes["images"];
$image_list = array();
foreach ($images as $image) {
	$image_list[] = image_info($image);
}
?>
<span <?php echo get_block_wrapper_attributes(array("class" => "tsb-gallery-row sr-only", "data-images" => json_encode($image_list))); ?>></span>