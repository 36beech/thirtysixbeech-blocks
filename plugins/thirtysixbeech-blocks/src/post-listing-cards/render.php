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

function makeEyebrow($show, $post, $dateFormat, $datePrefix)
{
	$showDate = in_array('date', $show);
	$showAuthor = in_array('author', $show);

	if (!$showDate && !$showAuthor) return null;

	$eyebrowText = $datePrefix . " ";
	if ($showDate) $eyebrowText .= get_the_date($dateFormat, $post->ID);
	if ($showAuthor) $eyebrowText .= " by " . get_the_author_meta('display_name', $post->post_author);
	return $eyebrowText;
}

$columns   = $attributes["columns"] ?? 2;
$post_type = $attributes["postType"] ?? '';
$posts_per_page = $attributes["postsPerPage"] ?? 10;
$pagination = $attributes["pagination"] ?? false;
$show = $attributes["show"] ?? array(
	"date",
	"author",
	"title",
	"excerpt",
	"readmore",
	"image"
);
$datePrefix = $attributes["datePrefix"] ?? "Posted";
$dateFormat = $attributes["dateFormat"] ?? "F j Y";

if (!empty($post_type)) :
	$posts = get_posts(array(
		'post_type'      => $post_type,
		'post_status'    => 'publish',
		'posts_per_page' => $posts_per_page,
	));
else:
	// No post type explicitly chosen — fall back to whatever WordPress is
	// already querying for this page: the blog listing, a post type archive,
	// a taxonomy archive, etc. Same source Core's Query Loop block uses for
	// its "Inherit query from template" mode.
	$posts = array_slice($wp_query->posts, 0, $posts_per_page);
endif;

$posts = array_slice($wp_query->posts, 0, $posts_per_page);

$cards = array();
foreach ($posts as $post):
	$card = array();
	$eyebrow = makeEyebrow($show, $post, $dateFormat, $datePrefix);
	if ($eyebrow) $card["eyebrow"] = $eyebrow;
	if (in_array('title', $show)) $card['title'] = $post->post_title;
	if (in_array('excerpt', $show)) $card['description'] = get_the_excerpt($post->ID);
	if (in_array('readmore', $show)) $card['link'] = "<a class=\"tsb-card__link\" href=\"{get_permalink($post->ID)}\">Learn More</a>";
	if (in_array('image', $show)) $card['image'] = get_the_post_thumbnail_url($post->ID, 'large');

	$cards[] = $card;
endforeach;
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php echo card_group($columns, $cards); ?>
</div>