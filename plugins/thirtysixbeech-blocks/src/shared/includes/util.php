<?php
/**
 * Outputs a responsive <img> (srcset + sizes) for an attachment ID.
 *
 * @param int         $image Attachment ID.
 * @param string|null $sizes Optional `sizes` attribute describing how wide the
 *                           image renders in this layout (e.g. "(min-width: 768px) 50vw, 100vw").
 *                           Defaults to WordPress's generated value for the full size.
 */
function image_html($image, $sizes = null)
{
	if (empty($image)) return;

	$image_obj = image_info($image, array('url', 'alt', 'width', 'height', 'srcset', 'sizes_attr'));
	if (empty($image_obj['url'])) return;

	$sizes = $sizes ?? $image_obj['sizes_attr'];

	$attrs = array(
		'src="' . esc_url($image_obj['url']) . '"',
		'alt="' . esc_attr($image_obj['alt']) . '"',
	);
	if (!empty($image_obj['width']) && !empty($image_obj['height'])) {
		$attrs[] = 'width="' . (int) $image_obj['width'] . '"';
		$attrs[] = 'height="' . (int) $image_obj['height'] . '"';
	}
	if (!empty($image_obj['srcset'])) {
		$attrs[] = 'srcset="' . esc_attr($image_obj['srcset']) . '"';
		if (!empty($sizes)) $attrs[] = 'sizes="' . esc_attr($sizes) . '"';
	}

	return '
		<img
			' . implode("\n\t\t\t", $attrs) . '
			class="relative z-0 w-full h-full object-cover"
			loading="lazy"
			decoding="async" />';
}

/**
 * Returns info about an image attachment as an associative array.
 *
 * Available keys: url, width, height, mime_type, srcset, sizes_attr, alt,
 * title, caption, description, sizes (array of every registered size).
 *
 * @param int        $image  Attachment ID.
 * @param array|null $fields Keys to return. Defaults to all of them; only the
 *                           data for requested keys is looked up.
 * @return array|null Null if the attachment has no image.
 */
function image_info($image, $fields = null)
{
	if (empty($image)) return;
	$image_url = wp_get_attachment_image_url($image, 'full') ?? null;
	if (empty($image_url)) return;

	$want = function ($key) use ($fields) {
		return $fields === null || in_array($key, $fields, true);
	};

	$info = array('url' => $image_url);

	if ($want('width') || $want('height')) {
		$full = wp_get_attachment_image_src($image, 'full');
		$info['width']  = $full[1] ?? null;
		$info['height'] = $full[2] ?? null;
	}

	if ($want('mime_type')) {
		$info['mime_type'] = get_post_mime_type($image) ?: '';
	}

	if ($want('srcset')) {
		$info['srcset'] = wp_get_attachment_image_srcset($image, 'full') ?: '';
	}

	if ($want('sizes_attr')) {
		$info['sizes_attr'] = wp_get_attachment_image_sizes($image, 'full') ?: '';
	}

	if ($want('alt')) {
		$info['alt'] = get_post_meta($image, '_wp_attachment_image_alt', true);
	}

	if ($want('title') || $want('caption') || $want('description')) {
		$attachment = get_post($image);
		$info['title']       = $attachment->post_title ?? '';
		$info['caption']     = $attachment->post_excerpt ?? '';
		$info['description'] = $attachment->post_content ?? '';
	}

	if ($want('sizes')) {
		$sizes = array();
		foreach (array_merge(array('full'), get_intermediate_image_sizes()) as $size) {
			$src = wp_get_attachment_image_src($image, $size);
			if (!$src) continue;

			$sizes[$size] = array(
				'url'    => $src[0],
				'width'  => $src[1],
				'height' => $src[2],
			);
		}
		$info['sizes'] = $sizes;
	}

	if ($fields === null) return $info;

	return array_intersect_key($info, array_flip($fields));
}
