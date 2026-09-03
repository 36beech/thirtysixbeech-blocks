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
require_once(__DIR__ . "/../shared/includes/card.php");

$image = $attributes["image"] ?? null;
$overline = $attributes["overline"] ?? null;
$title = $attributes["title"] ?? null;
$description  = $attributes["description"] ?? null;

$card = array();

$card['image'] = !empty($image) ? wp_get_attachment_image_url($image, 'full') : null;
$card['eyebrow'] = $overline;
$card['title'] = $title;
$card['description'] = $description;
$card['link'] = $content;
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php echo card($card); ?>
</div>