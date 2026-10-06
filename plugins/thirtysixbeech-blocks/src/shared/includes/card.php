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

/**
 * Finds the first <a> with an href in a chunk of rendered HTML (e.g. the saved HTML
 * of a core/button block) and returns its URL and whether it opens in a new window.
 *
 * @param string|null $html
 * @return array{url: string, opens_in_new_tab: bool}|null Null if there's no link.
 */
function card_link_info($html)
{
  if (empty($html)) return null;

  $tags = new WP_HTML_Tag_Processor($html);
  while ($tags->next_tag('a')) {
    $href = $tags->get_attribute('href');
    if (is_string($href) && $href !== '') {
      return array(
        'url'              => $href,
        'opens_in_new_tab' => $tags->get_attribute('target') === '_blank',
      );
    }
  }

  return null;
}

function card($card)
{
  $link_info = card_link_info($card['link'] ?? null);
  $image = !empty($card['image']) ? "<img src=\"{$card['image']}\" class=\"block h-full w-full object-cover object-center\" />" : null;

  ob_start();
?>
  <div class="tsb-card" <?php
                        if (!empty($card["id"])): echo " data-post-id=\"{$card["id"]}\"";
                        endif; ?>>
    <div class="tsb-card__image">
      <?php if (!empty($image)): ?>
        <?php echo $image; ?>
      <?php endif; ?>
    </div>
    <div class="tsb-card__body">
      <?php if (!empty($card["eyebrow"])): ?>
        <div class="tsb-card__eyebrow"><?php echo $card["eyebrow"]; ?></div>
      <?php endif; ?>
      <?php if (!empty($card['title'])): ?>
        <h3 class="tsb-card__heading">
          <?php if ($link_info): ?>
            <a href="<?php echo esc_url($link_info['url']); ?>" class="tsb-card__title-link" <?php echo $link_info['opens_in_new_tab'] ? ' target="_blank" rel="noreferrer noopener"' : ''; ?>><?php echo $card['title']; ?></a>
          <?php else: ?>
            <?php echo $card['title']; ?>
          <?php endif; ?>
        </h3>
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
