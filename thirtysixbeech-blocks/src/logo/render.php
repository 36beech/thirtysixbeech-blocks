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
$desktop_logo_id = $attributes["desktopLogo"];
$desktop_logo = $desktop_logo_id ? wp_get_attachment_image(
    $desktop_logo_id,
    "medium",
    false,
    array(
			"class" => "w-full block", 
			"loading" => "lazy", 
			"decoding" => "async"
		)
  ) : "";

$block_attributes = array(
	"style" => implode( ";", array(
		"--desktop-logo-width: " . $attributes["desktopLogoWidth"],
		"--mobile-logo-width: " . $attributes["mobileLogoWidth"]
	) ),
	"class" => implode( " ", array(
		"w-(--mobile-logo-width)",
		"md:w-(--desktop-logo-width)"
	) ),
);
?>
<div <?php echo get_block_wrapper_attributes( $block_attributes ); ?>>
	<?php echo $desktop_logo; ?>
</div>
