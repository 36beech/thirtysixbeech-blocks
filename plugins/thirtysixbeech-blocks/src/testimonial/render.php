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
$quote = $attributes["quote"] ?? null;
$author = $attributes["author"] ?? null;
$author_title = $attributes["authorTitle"] ?? null;
?>
<blockquote <?php echo get_block_wrapper_attributes(array("class" => "tsb-testimonial")); ?>>
	<?php if (!empty($quote)): ?>
		<q class="tsb-testimonial__text">
			<?php echo $quote; ?>
		</q>
	<?php endif; ?>
	<div class="tsb-testimonial__author">
		<?php if (!empty($author)): ?>
			<span class="tsb-testimonial__author-name">
				<?php echo $author; ?>
			</span>
		<?php endif; ?>
		<?php if (!empty($author_title)): ?>
			<span class="tsb-testimonial__author-title">
				<?php echo $author_title; ?>
			</span>
		<?php endif; ?>
	</div>
</blockquote>