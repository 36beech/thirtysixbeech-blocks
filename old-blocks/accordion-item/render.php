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
<details <?php echo get_block_wrapper_attributes(); ?>>
	<summary class="tsb-accordion-summary flex justify-between items-center">
		<span><?php echo $attributes["summary"]; ?></span>
		<div class="tsb-accordion-summary-carat w-4.25 h-2.5 shrink-0 grow-0">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 10" class="h-full w-full fill-current"><path d="M7.71.34c.43-.45 1.14-.45 1.57 0l7.4 7.69c.43.45.43 1.18 0 1.63s-1.14.45-1.57 0L8.5 2.79 1.89 9.66c-.43.45-1.14.45-1.57 0s-.43-1.18 0-1.63z"/></svg>
		</div>
	</summary>
	<div class="tsb-accordion-content">
		<?php echo $content; ?>
	</div>
</details>