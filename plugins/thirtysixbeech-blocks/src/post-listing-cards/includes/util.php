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
