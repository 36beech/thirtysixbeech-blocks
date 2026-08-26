<?php
function image_html($image)
{
  if (empty($image)) return;

  $image_html = wp_get_attachment_image_url($image, 'full') ?? null;
  if (empty($image_html)) return;

  return '
		<img
			src="' . $image_html . '"
			alt=""
			class="relative z-0 w-full h-full object-cover"
			loading="lazy"
			decoding="async" />';
}
