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
$profiles = array();

foreach ($block->inner_blocks as $profile_block) {
	$profiles[] = array(
		'portrait'     => $profile_block->attributes['portrait'] ?? null,
		'name'         => $profile_block->attributes['name'] ?? null,
		'title'        => $profile_block->attributes['title'] ?? null,
		'inner_blocks' => $profile_block->inner_blocks,
	);
}
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="tsb-profile flex max-sm:flex-col gap-tsb items-center">
		<div class="tsb-profile__portrait">
			<div class="tsb-profile-carousel__images">
				<?php foreach ($profiles as $profile) :
					$image = !empty($profile['portrait']) ? wp_get_attachment_image($profile['portrait'], 'full', false, array(
						'class' => 'tsb-profile__portrait-image w-full h-full object-cover object-center',
					)) : null;
				?>
					<div class="tsb-profile__image-slide"><?php if ($image) echo $image; ?></div>
				<?php endforeach; ?>
			</div>
		</div>
		<div class="tsb-profile__body">
			<div class="tsb-profile-carousel__images">
				<?php foreach ($profiles as $profile) : ?>
					<div class="tsb-profile__body-slide">
						<?php if ($profile['name']): ?>
							<h3 class="tsb-profile__name"><?php echo $profile['name']; ?></h3>
						<?php endif; ?>
						<?php if ($profile['title']): ?>
							<div class="tsb-profile__title"><?php echo $profile['title']; ?></div>
						<?php endif; ?>
						<?php foreach ($profile['inner_blocks'] as $grandchild) : ?>
							<?php echo $grandchild->render(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
							?>
						<?php endforeach; ?>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</div>