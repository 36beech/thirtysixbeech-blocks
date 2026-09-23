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
$title = $attributes["title"] ?? null;
$background_image = $attributes["backgroundImage"] ?? null;
$logo = $attributes["logo"] ?? null;
$logo_width = $attributes["logoWidth"] ?? 100;
$link = $attributes["link"] ?? null;

$background_url = $background_image ? wp_get_attachment_image_url($background_image, 'full') : null;
$logo_url = $logo ? wp_get_attachment_image_url($logo, 'full') : null;
?>
<?php if (!empty($link) && ($link["url"] ?? false)): ?>
	<a href="<?php echo $link["url"]; ?>" <?php if ($link["opensInNewTab"] ?? false) echo ' target="_blank"'; ?>>
	<?php endif; ?>
	<article <?php echo get_block_wrapper_attributes(array("style" => "--spacing-pub-logo: {$logo_width}%")); ?>>
		<div class="tsb-image-publication-card relative z-0 w-full">

			<?php if (!empty($background_url)): ?>
				<div class="relative w-full h-full top-0 left-0 z-0 tsb-image-publication-card__image">
					<img
						src="<?php echo $background_url; ?>"
						class="w-full h-full object-cover object-center tsb-image-publication-card__background-image" />
				</div>
			<?php endif; ?>

			<div class="absolute w-full h-full top-0 left-0 z-10 tsb-image-publication-card__overlay"></div>

			<?php if (!empty($background_url)): ?>
				<div class="absolute w-full h-full top-0 left-0 z-20 flex flex-col items-stretch justify-center tsb-image-publication-card__logo">
					<img
						src="<?php echo $logo_url; ?>"
						class="tsb-image-publication-card__logo-image w-pub-logo m-auto" />
				</div>
			<?php endif; ?>
		</div>
		<h3 class="tsb-image-publication-card__title"><?php echo $title; ?></h3>
	</article>
	<?php if (!empty($link)): ?>
	</a>
<?php endif; ?>