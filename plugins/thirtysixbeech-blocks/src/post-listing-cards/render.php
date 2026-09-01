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
$columns   = $attributes["columns"];
$post_type = $attributes["postType"];

$posts = $post_type ? get_posts(array(
	'post_type'      => $post_type,
	'post_status'    => 'publish',
	'posts_per_page' => 2,
)) : array();

$cards = array();
foreach ($posts as $post):
	$cards[] = array(
		"title" => $post->post_title,
		"description" => get_the_excerpt($post->ID),
		"link" => get_permalink($post->ID),
		"image" => get_the_post_thumbnail_url($post->ID, 'large')
	);
endforeach;
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php echo card_group($columns, $cards); ?>
</div>