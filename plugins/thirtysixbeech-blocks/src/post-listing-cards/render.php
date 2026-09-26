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
$featured = $attributes["featured"] ?? 'none';
$posts_per_page = ($attributes["postsPerPage"] ?? 10);
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

$paged = max(1, (int) get_query_var('paged'));
$posts_per_page = (int) $posts_per_page;

// In "most recent" mode the first post is pulled out as the featured card, so
// page 1 fetches one extra post. Later pages must skip everything already
// shown (including that extra one), which `paged` alone can't express, so
// this uses `offset` instead.
$featured_extra = $featured === "most recent" ? 1 : 0;
$fetch_count = $posts_per_page + ($paged === 1 ? $featured_extra : 0);
$offset = $paged === 1 ? 0 : ($paged - 1) * $posts_per_page + $featured_extra;

if (!empty($post_type) && $post_type !== "current query") :
	$query_args = array(
		'post_type'           => $post_type,
		'post_status'         => 'publish',
		'ignore_sticky_posts' => true,
	);
else:
	$query_args = is_array($wp_query->query) ? $wp_query->query : wp_parse_args($wp_query->query);
	if (empty($query_args['post_type'])) $query_args['post_type'] = 'post';
	unset($query_args['paged']);
endif;

$query_args['posts_per_page'] = $fetch_count;
$query_args['offset'] = $offset;

$listing_query = new WP_Query($query_args);
$posts = $listing_query->posts;

// Only offer a "View More" link when there are posts beyond this page.
// (max_num_pages ignores `offset`, so compare against found_posts instead.)
$view_more_url = '';
if ($listing_query->found_posts > $offset + $fetch_count) {
	// Singular pages don't have /page/N/ archive URLs, so use a query arg there.
	$view_more_url = is_singular()
		? add_query_arg('paged', $paged + 1)
		: get_pagenum_link($paged + 1);
}

/* TODO: Handle selected featured post */
$featured_post = null;
if ($featured === "most recent" && !empty($posts)) {
	$featured_post = array_shift($posts);
}

$cards = array();
foreach ($posts as $post):
	$cards[] = makePostCard($post, $show, $dateFormat, $datePrefix);
endforeach;

// What the front-end script needs to request the next batch: how many to
// fetch each time, and how many posts have already been shown.
$query_args['posts_per_page'] = $posts_per_page;
$query_args['offset'] = $offset + $listing_query->post_count;

$options = array(
	"datePrefix" => $datePrefix,
	"dateFormat" => $dateFormat,
);
?>
<div <?php echo get_block_wrapper_attributes(array("data-query" => json_encode($query_args), "data-options" => json_encode($options))); ?>>
	<?php if (!empty($featured_post)):
		$card = makePostCard($featured_post, $show, $dateFormat, $datePrefix);
	?>

		<div class="flex flex-col md:grid grid-cols-12 md:items-center gap-tsb mb-30 tsb-card-horizontal">

			<div class="md:col-span-7 lg:col-span-8 md:col-start-6 lg:col-start-5 row-start-1">
				<div class="tsb-card__image">
					<?php if (!empty($card['image'])): ?>
						<img src="<?php echo $card['image']; ?>" class="block h-full w-full object-cover object-center" />
					<?php endif; ?>
				</div>
			</div>

			<div class="md:col-span-5 lg:col-span-4 md:col-start-1 lg:col-start-1 row-start-1">
				<div class="tsb-card__body">
					<?php if (!empty($card["eyebrow"])): ?>
						<div class="tsb-card__eyebrow"><?php echo $card["eyebrow"]; ?></div>
					<?php endif; ?>
					<?php if (!empty($card['title'])): ?>
						<h3 class="tsb-card__heading"><?php echo $card['title']; ?></h3>
					<?php endif; ?>
					<?php if (!empty($card['description'])): ?>
						<p class="tsb-card__description"><?php echo nl2br($card['description']); ?></p>
					<?php endif; ?>
				</div>
				<?php if (!empty($card['link'])):
					echo $card['link'];
				endif; ?>
			</div>
		</div>
	<?php endif; ?>
	<?php echo card_group($columns, $cards); ?>
	<?php if ($view_more_url): ?>
		<div class="wp-block-button is-style-link tsb-view-more">
			<a href="<?php echo esc_url($view_more_url); ?>" class="wp-block-button__link wp-element-button"><?php esc_html_e('View More', 'thirtysixbeech-blocks'); ?></a>
		</div>
	<?php endif; ?>
</div>