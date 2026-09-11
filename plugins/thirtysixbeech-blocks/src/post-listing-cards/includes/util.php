<?php
function makeEyebrow($show, $post, $dateFormat, $datePrefix)
{
  $showDate = in_array('date', $show);
  $showAuthor = in_array('author', $show);

  if (!$showDate && !$showAuthor) return null;

  $eyebrowText = $datePrefix . " ";
  if ($showDate) $eyebrowText .= get_the_date($dateFormat, $post->ID);
  if ($showAuthor) $eyebrowText .= " by " . get_the_author_meta('display_name', $post->post_author);
  return $eyebrowText;
}

function makePostCard($post, $show, $dateFormat, $datePrefix)
{
  $card = array();
  $eyebrow = makeEyebrow($show, $post, $dateFormat, $datePrefix);
  $permalink = get_permalink($post->ID);

  if ($eyebrow) $card["eyebrow"] = $eyebrow;
  if (in_array('title', $show)) $card['title'] = $post->post_title;
  if (in_array('excerpt', $show)) $card['description'] = get_the_excerpt($post->ID);
  if (in_array('readmore', $show)) $card['link'] = "<a class=\"tsb-card__link\" href=\"{$permalink}\">Learn More</a>";
  if (in_array('image', $show)) $card['image'] = get_the_post_thumbnail_url($post->ID, 'large');

  return $card;
}
