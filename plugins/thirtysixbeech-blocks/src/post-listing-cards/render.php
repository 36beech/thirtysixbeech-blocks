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
global $wp_query;

$columns   = $attributes["columns"] ?? 2;
$post_type = $attributes["postType"] ?? '';
$specify_posts_per_page = $attributes["specifyPostsPerPage"] ?? false;
$posts_per_page = $attributes["postsPerPage"] ?? null;
$pagination = $attributes["pagination"] ?? false;

if (!empty($post_type)) :
	$posts = get_posts(array(
		'post_type'      => $post_type,
		'post_status'    => 'publish',
		'posts_per_page' => 2,
	));
else:
	// No post type explicitly chosen — fall back to whatever WordPress is
	// already querying for this page: the blog listing, a post type archive,
	// a taxonomy archive, etc. Same source Core's Query Loop block uses for
	// its "Inherit query from template" mode.
	$posts = array_slice($wp_query->posts, 0, 2);
endif;

$posts = array_slice($wp_query->posts, 0, 2);

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