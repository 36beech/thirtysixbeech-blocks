<?php

function profile($body, $image)
{
  ob_start();
?>
  <div class="tsb-profile flex max-sm:flex-col gap-tsb items-center">
    <div class="tsb-profile__portrait">
      <?php if ($image) echo $image; ?>
    </div>
    <div class="tsb-profile__body">
      <?php if ($body) echo $body; ?>
    </div>
  </div>
<?php
  return ob_get_clean();
}
