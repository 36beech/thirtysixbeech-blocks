<?php

function card_group($columns, $cards)
{
  $columnClasses = array(
    'grid-cols-2',
    'grid-cols-2 md:grid-cols-3',
    'grid-cols-2 md:grid-cols-4',
  );

  $grid_class = "flex flex-col md:grid gap-x-tsb gap-y-tsb-half {$columnClasses[$columns - 2]}";
  ob_start();
?>
  <div class="<?php echo $grid_class; ?>">
    <?php foreach ($cards as $card):
      echo card($card);
    endforeach; ?>
  </div>
<?php
  return ob_get_clean();
}

function card($card)
{
  ob_start();
?>
  <div class="tsb-card">
    <div class="tsb-card__image">
      <?php if (!empty($card['image'])): ?>
        <img src="<?php echo $card['image']; ?>" class="block h-full w-full object-cover object-center" />
      <?php endif; ?>
    </div>
    <div class="tsb-card__body">
      <?php if (!empty($card["eyebrow"])): ?>
        <div class="tsb-card__eyebrow"><?php echo $card["eyebrow"]; ?></div>
      <?php endif; ?>
      <?php if (!empty($card['title'])): ?>
        <h3 class="tsb-card__heading"><?php echo $card['title']; ?></h3>
      <?php endif; ?>
      <?php if (!empty($card['description'])): ?>
        <p class="tsb-card__description"><?php echo nl2br($card['description']); ?></p>
      <?php endif; ?>
    </div>
    <?php if (!empty($card['link'])):
      echo $card['link'];
    endif; ?>
  </div>
<?php
  return ob_get_clean();
}
