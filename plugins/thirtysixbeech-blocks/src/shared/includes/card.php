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
        <img src="<?php echo $card['image']; ?>" />
      <?php endif; ?>
    </div>
    <div class="tsb-card__body">
      <?php if (!empty($card['title'])): ?>
        <h2 class="tsb-card__heading"><?php echo $card['title']; ?></h2>
      <?php endif; ?>
      <?php if (!empty($card['title'])): ?>
        <p class="tsb-card__description"><?php echo nl2br($card['description']); ?></p>
      <?php endif; ?>
    </div>
    <?php if (!empty($card['link'])): ?>
      <a class="btn btn-tertiary" href="<?php echo $card['link']; ?>">Learn More</a>
    <?php endif; ?>
  </div>
<?php
  return ob_get_clean();
}
