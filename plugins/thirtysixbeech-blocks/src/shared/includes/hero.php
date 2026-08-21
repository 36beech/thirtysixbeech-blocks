<?php

/**
 * Builds the front-end markup for the Hero block.
 *
 * @param int|null    $background_image Background image attachment ID.
 * @param string|null $heading          Heading text.
 * @param string|null $description      Description text.
 * @return string HTML markup.
 */
function hero($background_image, $heading, $description)
{
  $background_url = $background_image ? wp_get_attachment_image_url($background_image, 'full') : '';

  ob_start();
?>
  <div class="tsb-hero relative z-0">
    <?php if ($background_url) : ?>
      <div class="tsb-hero__image h-full relative z-0">
        <img
          src="<?php echo esc_url($background_url); ?>"
          alt=""
          class="relative z-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async" />
      </div>
    <?php endif; ?>
    <span class="tsb-hero__overlay absolute z-10 top-0 left-0 w-full h-full"></span>
    <div class="tsb-hero__body px-5 is-layout-constrained w-full absolute left-0 bottom-0 z-20">
      <div class="tsb-hero__body-container">
        <div class="tsb-hero__body-inner">
          <?php if ($heading) : ?>
            <h2 class="tsb-hero__heading"><?php echo esc_html($heading); ?></h2>
          <?php endif; ?>
          <?php if ($description) : ?>
            <p class="tsb-hero__description"><?php echo esc_html($description); ?></p>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </div>
<?php
  return ob_get_clean();
}
