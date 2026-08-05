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

?>
<blockquote <?php echo get_block_wrapper_attributes(); ?>>
	<q class="tsb-quote-text">
		<?php echo $attributes["quote"]; ?>
	</q>
	<div class="tsb-quote-author">
		<span class="tsb-quote-author--name">
			<?php echo $attributes["author"]; ?>
		</span>
		<span class="tsb-quote-author--title">
			<?php echo $attributes["authorTitle"]; ?>
		</span>
	</div>
</blockquote>