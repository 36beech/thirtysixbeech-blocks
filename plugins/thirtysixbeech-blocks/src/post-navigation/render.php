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
global $post;
$current_id = $post->ID;

$posts = get_posts(array(
	'post_type'      => $post->post_type,
	'post_status'    => 'publish',
	'posts_per_page' => -1,
));

$current_post = array_search($current_id, array_column($posts, 'ID'));
$total_posts = sizeof($posts) - 1;

$previous = $current_post > 0 ? $current_post - 1 : $total_posts;
$next = $current_post < $total_posts ? $current_post + 1 : 0;

$previous_post = $posts[$previous];
$next_post = $posts[$next];
?>
<div <?php echo get_block_wrapper_attributes(array("class" => "flex justify-center items-center tsb-post-navigation")); ?>>
	<div><a href="<?php echo get_permalink($previous_post->ID); ?>" class="tsb-post-navigation__nextprev prev"><?php echo $previous_post->post_title; ?></a></div>
	<ul class="flex tsb-post-navigation__pages">
		<?php foreach ($posts as $i => $p): ?>
			<li><a href="<?php echo get_permalink($p->ID); ?>" class="tsb-post-navigation__pages-num<?php echo $i === $current_post ? ' current' : ''; ?>"><?php echo $i + 1; ?></a></li>
		<?php endforeach; ?>
	</ul>
	<div><a href="<?php echo get_permalink($next_post->ID); ?>" class="tsb-post-navigation__nextprev next"><?php echo $next_post->post_title; ?></a></div>
</div>