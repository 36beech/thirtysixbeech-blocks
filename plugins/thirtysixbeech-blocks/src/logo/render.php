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
$desktop_logo = thirtysixbeech_blocks_get_logo_markup( 'logo' );
$mobile_logo = thirtysixbeech_blocks_get_logo_markup( 'mobile_logo' );

$block_attributes = array(
	'style' => implode( ';', array(
		'--desktop-logo-width: ' . $attributes['desktopLogoWidth'],
		'--mobile-logo-width: ' . $attributes['mobileLogoWidth'],
	) ),
	'class' => implode( ' ', array(
		'w-(--mobile-logo-width)',
		'md:w-(--desktop-logo-width)',
	) ),
);
?>
<div <?php echo get_block_wrapper_attributes( $block_attributes ); ?>>
	<a href="<?php echo esc_url( get_home_url() ); ?>" title="<?php echo esc_attr( sprintf( 'Return to %s home', get_bloginfo( 'name' ) ) ); ?>" aria-label="<?php echo esc_attr( sprintf( 'Return to %s home', get_bloginfo( 'name' ) ) ); ?>">
		<?php echo $desktop_logo; ?>
	</a>
</div>
