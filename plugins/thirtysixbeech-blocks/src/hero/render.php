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
require_once(__DIR__ . "/../shared/includes/hero.php");
$background_image  = $attributes['backgroundImage'];
$heading           = !empty($attributes['heading']) ? '<h2 class="tsb-hero__heading">' . esc_html($attributes['heading']) . '</h2>' : '';
$description       = !empty($attributes['description']) ? '<p class="tsb-hero__description">' . esc_html($attributes['description']) . '</p>' : '';
$link_url          = $attributes['link']['url'] ?? '';
$link_text         = $attributes['link']['title'] ?? '';
$link_new_tab      = ! empty($attributes['link']['opensInNewTab']);
$link              = ($link_url && $link_text)
	? sprintf(
		'<div class="wp-block-button is-style-link"><a class="wp-block-button__link" href="%s"%s>%s</a></div>',
		esc_url($link_url),
		$link_new_tab ? ' target="_blank" rel="noreferrer noopener"' : '',
		esc_html(html_entity_decode(wp_strip_all_tags($link_text)))
	)
	: '';
?>
<header <?php echo get_block_wrapper_attributes(); ?>>
	<?php echo hero($background_image, $heading, $description, $link); ?>
</header>