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
$card_text = $attributes["cardText"];
$card_icon_id = $attributes["cardIcon"];

$card_icon = $card_icon_id ? wp_get_attachment_image(
	$card_icon_id,
	'full',
	false,
	['class' => '', 'loading' => 'lazy', 'decoding' => 'async']
) : "";

?>
<div <?php echo get_block_wrapper_attributes(array("class" => "flex gap-7.5 items-center")); ?>>
	<div class="grow-0 shrink-0 icon-card-icon">
		<div class="aspect-square w-11.25">
		<?php echo $card_icon; ?>
		</div>
	</div>
	<div class="flex-1 icon-card-content">
		<?php echo $card_text; ?>
	</div>
</div>