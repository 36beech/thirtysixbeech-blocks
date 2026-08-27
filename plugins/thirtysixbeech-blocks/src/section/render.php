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

$allowed_tags = ['section', 'header', 'footer', 'div', 'article'];
$raw_tag      = $attributes['semanticTag'] ?? 'section';
$tag          = in_array($raw_tag, $allowed_tags, true) ? $raw_tag : 'section';

$background_image  = $attributes['backgroundImage'] ?? null;
$background_url = $background_image ? wp_get_attachment_image_url($background_image, 'full') : '';

$block_attributes = get_block_wrapper_attributes(array("class" => "relative px-5"));
?>
<<?php echo esc_attr($tag); ?> <?php echo $block_attributes; ?>>
	<?php if (!empty($background_url)) : ?>
		<div class="tsb-section__background absolute top-0 left-0 z-0 w-full h-full">
			<img
				src="<?php echo esc_url($background_url); ?>"
				alt=""
				class="w-full h-full object-cover relative z-0"
				loading="lazy"
				decoding="async" />
			<span class="tsb-section__background-overlay w-full h-full absolute top-0 left-0"></span>
		</div>
	<?php endif; ?>
	<div class="relative z-10"><?php echo $content; ?></div>
</<?php echo esc_attr($tag); ?>>