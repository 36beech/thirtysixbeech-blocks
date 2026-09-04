<?php

/**
 * Builds the front-end markup for the Hero block.
 *
 * $heading and $description are echoed as-is (not escaped) — callers are
 * responsible for supplying safe markup, since some callers pass already
 * block-rendered HTML (e.g. InnerBlocks content) rather than plain text.
 *
 * @param int|null    $background_image Background image attachment ID.
 * @param string|null $heading          Heading markup.
 * @param string|null $description      Description markup.
 * @return string HTML markup.
 */
function hero($background_image, $heading, $description)
{
  $background_url = $background_image ? wp_get_attachment_image_url($background_image, 'full') : '';

  ob_start();
?>
  <div class="tsb-hero relative z-0 grid grid-cols-1 grid-rows-1">
    <?php if ($background_url) : ?>
      <div class="tsb-hero__image relative z-0 col-start-1 row-start-1">
        <img
          src="<?php echo esc_url($background_url); ?>"
          alt=""
          class="block relative z-0 w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async" />
      </div>
    <?php endif; ?>
    <span class="tsb-hero__overlay absolute z-10 top-0 left-0 w-full h-full"></span>
    <div class="tsb-hero__body px-5 is-layout-constrained relative z-20 col-start-1 row-start-1">
      <div class="tsb-hero__body-container">
        <div class="tsb-hero__body-inner">
          <?php if ($heading) : ?>
            <?php echo $heading; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
            ?>
          <?php endif; ?>
          <?php if ($description) : ?>
            <?php echo $description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
            ?>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </div>
<?php
  return ob_get_clean();
}
