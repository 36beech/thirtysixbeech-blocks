<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$id = uniqid();
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
  <form>
    <label for="<?php echo $id; ?>-email">Your email</label>
    <input id="<?php echo $id; ?>-email" type="email" name="email" />
    <label for="<?php echo $id; ?>-name">Your name</label>
    <input id="<?php echo $id; ?>-name" type="text" name="name" />

    <label for="<?php echo $id; ?>-message">Message</label>
    <textarea id="<?php echo $id; ?>-message" name="message"></textarea>
    <div class="wp-block-button"><button class="wp-block-button__link wp-element-button">Send</button></div>
  </form>
</div>