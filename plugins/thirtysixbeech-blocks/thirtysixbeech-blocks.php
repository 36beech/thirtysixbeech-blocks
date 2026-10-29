<?php

/**
 * Plugin Name:       Thirtysixbeech Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            36Beech
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       thirtysixbeech-blocks
 *
 * @package CreateBlock
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

define('THIRTYSIXBEECH_BLOCKS_FILE', __FILE__);

require_once plugin_dir_path(__FILE__) . 'includes/svg.php';
require_once plugin_dir_path(__FILE__) . 'includes/site-settings.php';
require_once plugin_dir_path(__FILE__) . 'includes/contact-form.php';
require_once plugin_dir_path(__FILE__) . 'includes/focal-point.php';

/**
 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function create_block_thirtysixbeech_blocks_block_init()
{
    wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
}
add_action('init', 'create_block_thirtysixbeech_blocks_block_init');

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

/**
 * Enqueue front end styles
 */
function thirtysixbeech_blocks_enqueue_styles()
{
    wp_enqueue_style(
        'thirtysixbeech-blocks',
        plugin_dir_url(__FILE__) . 'build/assets/css/main.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/assets/css/main.css')
    );
}
add_action('wp_enqueue_scripts', 'thirtysixbeech_blocks_enqueue_styles');

/**
 * Enqueue editor styles
 */
function thirtysixbeech_blocks_enqueue_shared_block_styles()
{
    wp_enqueue_style(
        'thirtysixbeech-blocks',
        plugin_dir_url(__FILE__) . 'build/assets/css/main.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/assets/css/main.css')
    );

    wp_enqueue_style(
        'thirtysixbeech-blocks-shared',
        plugin_dir_url(__FILE__) . 'build/assets/css/editor.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/assets/css/editor.css')
    );
}
add_action('enqueue_block_assets', 'thirtysixbeech_blocks_enqueue_shared_block_styles');


function thirtysixbeech_blocks_modify_block_styles()
{
    register_block_style(
        'core/image',
        array(
            'name'  => 'cover',
            'label' => __('Cover', 'renaissance-windows-and-doors'),
        )
    );
    register_block_style(
        'core/image',
        array(
            'name'  => 'contain',
            'label' => __('Contain', 'renaissance-windows-and-doors'),
        )
    );
}

add_action('init', 'thirtysixbeech_blocks_modify_block_styles');

function thirtysixbeech_blocks_disable_shortcode_block()
{
    unregister_block_type('core/shortcode');
}
add_action('init', 'thirtysixbeech_blocks_disable_shortcode_block', 20);

function thirtysixbeech_blocks_disable_shortcode_block_editor()
{
    // core/shortcode gets hydrated straight into the block-registry data store
    // (bypassing the public registerBlockType() wrapper), so there's no script
    // handle we can reliably attach after. Watch the store instead and remove
    // it the moment it shows up, whenever that turns out to be.
    wp_add_inline_script(
        'wp-blocks',
        "wp.domReady( function() {"
            . " var unsubscribe = wp.data.subscribe( function() {"
            . " if ( wp.blocks.getBlockType( 'core/shortcode' ) ) {"
            . " wp.blocks.unregisterBlockType( 'core/shortcode' );"
            . " unsubscribe();"
            . " }"
            . " } );"
            . " } );"
    );
}
add_action('enqueue_block_editor_assets', 'thirtysixbeech_blocks_disable_shortcode_block_editor');

function thirtysixbeech_blocks_inline_svg_sprite()
{
    static $done = false;

    // Prevent double printing
    if ($done) {
        return;
    }
    $done = true;

    $sprite_path = plugin_dir_path(__FILE__) . 'build/sprite.svg';

    if (file_exists($sprite_path)) {
        echo '<!-- SVG Sprite -->';
        echo '<div class="sr-only">';
        echo file_get_contents($sprite_path); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo '</div>';
    }
}
add_action('wp_head', 'thirtysixbeech_blocks_inline_svg_sprite');


function thirysixbeech_current_year()
{
    return date("Y");
}

add_shortcode('current_year', 'thirysixbeech_current_year');

/**
 * [post_date] — outputs a post's date.
 *
 * Attributes:
 *   format  PHP date format string (default: the site's Date Format setting)
 *   id      Post ID to pull the date from (default: current post)
 */
function thirtysixbeech_blocks_post_date_shortcode($atts)
{
    $atts = shortcode_atts(
        array(
            'format' => get_option('date_format'),
            'id'     => get_the_ID(),
        ),
        $atts,
        'post_date'
    );

    if (! $atts['id']) {
        return '';
    }

    return esc_html(get_the_date($atts['format'], $atts['id']));
}
add_shortcode('post_date', 'thirtysixbeech_blocks_post_date_shortcode');

/**
 * [post_author] — outputs a post's author display name.
 *
 * Attributes:
 *   id  Post ID to pull the author from (default: current post)
 */
function thirtysixbeech_blocks_post_author_shortcode($atts)
{
    $atts = shortcode_atts(
        array(
            'id' => get_the_ID(),
        ),
        $atts,
        'post_author'
    );

    $post = ! empty($atts['id']) ? get_post($atts['id']) : null;

    if (! $post) {
        return '';
    }

    return esc_html(get_the_author_meta('display_name', $post->post_author));
}
add_shortcode('post_author', 'thirtysixbeech_blocks_post_author_shortcode');

/**
 * [privacy_policy_link] — links to whichever page is set as the Privacy Policy
 * (Settings → Privacy), so the link follows if that page is renamed, moved or replaced.
 * Outputs nothing if no published privacy page is set.
 *
 * Attributes:
 *   text   Link text (default: the privacy page's title)
 *   class  CSS class(es) for the link (optional)
 *   url    Set to "only" to output just the URL, for use inside your own link markup
 */
function thirtysixbeech_blocks_privacy_policy_link_shortcode($atts)
{
    $atts = shortcode_atts(
        array(
            'text'  => '',
            'class' => '',
            'url'   => '',
        ),
        $atts,
        'privacy_policy_link'
    );

    $url = get_privacy_policy_url();

    if (! $url) {
        return '';
    }

    if ('only' === $atts['url']) {
        return esc_url($url);
    }

    $text = '' !== $atts['text']
        ? $atts['text']
        : get_the_title((int) get_option('wp_page_for_privacy_policy'));

    return sprintf(
        '<a href="%s"%s>%s</a>',
        esc_url($url),
        '' !== $atts['class'] ? ' class="' . esc_attr($atts['class']) . '"' : '',
        esc_html($text)
    );
}
add_shortcode('privacy_policy_link', 'thirtysixbeech_blocks_privacy_policy_link_shortcode');
