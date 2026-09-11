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
require_once(__DIR__ . "/includes/util.php");
global $wp_query;


$columns   = $attributes["columns"] ?? 2;
$post_type = $attributes["postType"] ?? '';
$posts_per_page = $attributes["postsPerPage"] ?? 10;
$featured = $attributes["featured"] ?? 'none';
$pagination = $attributes["pagination"] ?? false;
$show = $attributes["show"] ?? array(
	"date",
	"author",
	"title",
	"excerpt",
	"readmore",
	"image"
);

$posts_per_page += $featured === "most recent" ? 1 : 0;

$datePrefix = $attributes["datePrefix"] ?? "Posted";
$dateFormat = $attributes["dateFormat"] ?? "F j Y";

if (!empty($post_type) && $post_type !== "current query") :
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
	$posts = array_slice($wp_query->posts ?? array(), 0, $posts_per_page);
endif;

$featured_post = null;
if ($featured === "most recent" && !empty($posts)) {
	$featured_post = array_shift($posts);
}

$cards = array();
foreach ($posts as $post):
	$cards[] = makePostCard($post, $show, $dateFormat, $datePrefix);
endforeach;
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php if (!empty($featured_post)):
		$card = makePostCard($featured_post, $show, $dateFormat, $datePrefix);
	?>
		<pre><?php print_r($card); ?></pre>
		<div class="grid grid-cols-12 gap-tsb">
			<div class="col-span-4">
				Featured
			</div>
			<div class="col-span-8">
				Image
			</div>
		</div>
	<?php endif; ?>
	<?php echo card_group($columns, $cards); ?>
</div>