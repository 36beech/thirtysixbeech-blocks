<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function thirtysixbeech_base_setup() {
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'thirtysixbeech_base_setup' );

/**
 * Compiled base stylesheet (built from src/scss by `npm run build:css`).
 *
 * Loads on the base theme and on every child theme. It's enqueued before a child's own
 * stylesheet (child themes enqueue theirs at priority 20), so a child can override it. Its rules
 * are in the `tsb-base` cascade layer, so a child's unlayered CSS wins regardless of specificity.
 * A child that needs to opt out can wp_dequeue_style( 'thirtysixbeech-base-style' ).
 */
function thirtysixbeech_base_enqueue_assets() {
	$css_path = get_template_directory() . '/assets/css/base.css';

	if ( ! file_exists( $css_path ) ) {
		return;
	}

	wp_enqueue_style(
		'thirtysixbeech-base-style',
		get_template_directory_uri() . '/assets/css/base.css',
		array(),
		filemtime( $css_path )
	);
}
// Priority 5: print before the blocks plugin's stylesheet (priority 10), because the first
// stylesheet to declare the cascade-layer order decides it. See src/scss/style.scss.
add_action( 'wp_enqueue_scripts', 'thirtysixbeech_base_enqueue_assets', 5 );

/**
 * Same stylesheet inside the block editor. Priority 5 so it's added before a child theme's
 * own add_editor_style() calls (priority 10) and the child's styles win.
 */
function thirtysixbeech_base_editor_styles() {
	if ( ! file_exists( get_template_directory() . '/assets/css/base.css' ) ) {
		return;
	}

	add_editor_style( 'assets/css/base.css' );
}
add_action( 'after_setup_theme', 'thirtysixbeech_base_editor_styles', 5 );
