<?php
/**
 * Builds the front-end markup for the Hero block.
 *
 * @param int|null    $background_image Background image attachment ID.
 * @param string|null $heading          Heading text.
 * @param string|null $description      Description text.
 * @return string HTML markup.
 */
function hero( $background_image, $heading, $description ) {
	$background_url = $background_image ? wp_get_attachment_image_url( $background_image, 'full' ) : '';

	ob_start();
	?>
	<?php if ( $background_url ) : ?>
		<img
			src="<?php echo esc_url( $background_url ); ?>"
			alt=""
			class=""
			loading="lazy"
			decoding="async"
		/>
	<?php endif; ?>
	<div class="">
		<?php if ( $heading ) : ?>
			<h2 class="tsb-hero__heading"><?php echo esc_html( $heading ); ?></h2>
		<?php endif; ?>
		<?php if ( $description ) : ?>
			<p class="tsb-hero__description"><?php echo esc_html( $description ); ?></p>
		<?php endif; ?>
	</div>
	<?php
	return ob_get_clean();
}
