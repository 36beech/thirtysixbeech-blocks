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

function thirtysixbeech_base_enqueue_assets() {
	wp_enqueue_style( 'thirtysixbeech-base-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );
}
add_action( 'wp_enqueue_scripts', 'thirtysixbeech_base_enqueue_assets' );
