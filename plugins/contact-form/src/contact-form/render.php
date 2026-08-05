<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$id    = uniqid();
$token = wp_generate_uuid4();
set_transient(
    'cfp_token_' . $token,
    ! empty( $attributes['toAddress'] ) ? $attributes['toAddress'] : get_option( 'admin_email' ),
    HOUR_IN_SECONDS
);
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
  <form id="<?php echo $id; ?>-contact-form" class="contact-form" action="/wp-json/contact-form/v1/submit" method="POST">
    <div class="flex flex-col gap-5">
      <div>
        <label class="contact-form-label" for="<?php echo $id; ?>-name">Your name</label>
        <input id="<?php echo $id; ?>-name" type="text" name="name" />
      </div>
      <div>
        <label class="contact-form-label" for="<?php echo $id; ?>-email">Your email</label>
        <input id="<?php echo $id; ?>-email" type="email" name="email" />
      </div>
      <div>
        <label class="contact-form-label" for="<?php echo $id; ?>-message">Message</label>
        <textarea id="<?php echo $id; ?>-message" name="message"></textarea>
      </div>
      <input type="hidden" name="form_token" value="<?php echo esc_attr( $token ); ?>" />
      <div class="wp-block-button"><button class="wp-block-button__link wp-element-button">Send</button></div>
    </div>
  </form>
</div>