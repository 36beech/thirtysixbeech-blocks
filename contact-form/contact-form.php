<?php
/**
 * Plugin Name:       Thirtysixbeech Contact Form
 * Description:       A simple contact form for Wordpress
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            36Beech
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       thirtysixbeech-contact-form
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
function create_block_contact_form_block_init() {
	wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
}
add_action( 'init', 'create_block_contact_form_block_init' );

add_filter( 'wp_mail_from_name', function () {
    return get_bloginfo( 'name' ); // uses your site's name
} );

/**
 * Register the REST API route on plugin load.
 */
add_action( 'rest_api_init', function () {
    register_rest_route( 'contact-form/v1', '/submit', [
        'methods'             => 'POST',
        'callback'            => 'cfp_handle_submission',
        'permission_callback' => '__return_true', // Publicly accessible
        'args'                => cfp_get_endpoint_args(),
    ] );
} );

/**
 * Define and validate the expected arguments for the endpoint.
 *
 * @return array
 */
function cfp_get_endpoint_args(): array {
    return [
        'name' => [
            'required'          => true,
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'validate_callback' => function ( $value ) {
                return ! empty( trim( $value ) );
            },
        ],
        'email' => [
            'required'          => true,
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_email',
            'validate_callback' => function ( $value ) {
                return is_email( $value );
            },
        ],
        'message' => [
            'required'          => true,
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_textarea_field',
            'validate_callback' => function ( $value ) {
                return ! empty( trim( $value ) );
            },
        ],
    ];
}
 
/**
 * Handle the contact form submission and send an email.
 *
 * @param WP_REST_Request $request
 * @return WP_REST_Response|WP_Error
 */
function cfp_handle_submission( WP_REST_Request $request ) {
    $name    = $request->get_param( 'name' );
    $email   = $request->get_param( 'email' );
    $message = $request->get_param( 'message' );
 
    // --- Email configuration ---
    // $to      = get_option( 'admin_email' ); // Sends to the site's admin email
		$to = "aaronweidele@gmail.com";
    $subject = sprintf( 'New Contact Form Submission from %s', $name );
    $body    = sprintf(
        "You have received a new message via the contact form.\n\n" .
        "Name:    %s\n" .
        "Email:   %s\n" .
        "Message:\n%s",
        $name,
        $email,
        $message
    );
    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        sprintf( 'Reply-To: %s <%s>', $name, $email ),
    ];
 
    $sent = wp_mail( $to, $subject, $body, $headers );
 
    if ( ! $sent ) {
        return new WP_Error(
            'mail_failed',
            'Your message could not be sent. Please try again later.',
            [ 'status' => 500 ]
        );
    }
 
    return new WP_REST_Response(
        [ 'message' => 'Thank you! Your message has been sent.' ],
        200
    );
}