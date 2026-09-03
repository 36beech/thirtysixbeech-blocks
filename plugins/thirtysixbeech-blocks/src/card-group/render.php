<?php

/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$columns = $attributes['columns'];
$groupClasses = array("flex flex-col");

if ($columns !== "flex") $groupClasses[] = "md:grid";

switch ($columns):
	case 2:
		$groupClasses[] = "grid-cols-2";
		break;
	case 3:
		$groupClasses[] = "grid-cols-3";
		break;
	case 4:
		$groupClasses[] = "grid-cols-4";
		break;
endswitch;
$groupClasses[] = "gap-tsb";
?>
<div <?php echo get_block_wrapper_attributes(array("class" => implode(" ", $groupClasses))); ?>>
	<?php echo $content; ?>
</div>