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
$social_icon = $attributes["socialIcon"];
$social_link = $attributes["socialLink"];

if( ! $social_icon ) :
	return;
endif;
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php if( ! empty( $social_link ) ) : ?><a href="<?php echo $social_link; ?>" target="_blank" aria-label="Follow us on <?php echo $social_icon; ?>"><?php endif; ?>
	<svg class="w-6 h-6 fill-current" aria-hidden="true">
		<use href="#icon-<?php echo $social_icon; ?>"></use>
	</svg>
	<?php if( $social_link ) : ?></a><?php endif; ?>
</div>
