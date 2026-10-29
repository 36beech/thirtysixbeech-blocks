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
$portrait = $attributes["portrait"] ?? null;
$name = $attributes["name"] ?? null;
$title = $attributes["title"] ?? null;

$image = !empty($portrait) ? wp_get_attachment_image($portrait, 'full', false, array(
	'class' => 'tsb-profile__portrait-image w-full h-full object-cover object-center',
)) : null;
?>
<article <?php echo get_block_wrapper_attributes(array("class" => "tsb-profile flex max-sm:flex-col gap-tsb items-center")); ?>>
	<div class="tsb-profile__portrait">
		<?php if ($image) echo $image; ?>
	</div>
	<div class="tsb-profile__body">
		<?php if ($name): ?>
			<h3 class="tsb-profile__name"><?php echo $name; ?></h3>
		<?php endif; ?>
		<?php if ($title): ?>
			<div class="tsb-profile__title"><?php echo $title; ?></div>
		<?php endif; ?>
		<?php echo $content; ?>
	</div>
</article>