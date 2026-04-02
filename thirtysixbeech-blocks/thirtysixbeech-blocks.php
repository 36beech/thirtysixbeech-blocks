<?php
/**
 * Plugin Name:       Thirtysixbeech Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       thirtysixbeech-blocks
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function create_block_thirtysixbeech_blocks_block_init() {
	wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
}
add_action( 'init', 'create_block_thirtysixbeech_blocks_block_init' );

add_filter('block_categories_all', function ($categories, $post) {
    $custom_categories = [
        [
            'slug'  => 'thirtysixbeech-content',
            'title' => __('36Beech: Content', 'thirtysixbeech-blocks'),
            'icon'  => null,
        ],
        [
            'slug'  => 'thirtysixbeech-layout',
            'title' => __('36Beech: Layout', 'thirtysixbeech-blocks'),
            'icon'  => null,
        ],
        [
            'slug'  => 'thirtysixbeech-template',
            'title' => __('36Beech: Template Blocks', 'thirtysixbeech-blocks'),
            'icon'  => null,
        ],
        [
            'slug'  => 'thirtysixbeech-graphic-elements',
            'title' => __('36Beech: Graphic Elements', 'thirtysixbeech-blocks'),
            'icon'  => null,
        ],
    ];

    return array_merge($custom_categories, $categories);
}, 10, 2);
