<?php
/**
 * Site Settings admin page.
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function thirtysixbeech_blocks_logo_fields() {
	return array(
		'logo'        => __( 'Logo', 'thirtysixbeech-blocks' ),
		'mobile_logo' => __( 'Mobile Logo', 'thirtysixbeech-blocks' ),
		'footer_logo' => __( 'Footer Logo', 'thirtysixbeech-blocks' ),
	);
}

function thirtysixbeech_blocks_logo_option_name( $type ) {
	return 'thirtysixbeech_blocks_' . $type;
}

function thirtysixbeech_blocks_add_settings_page() {
	add_menu_page(
		__( 'Site Settings', 'thirtysixbeech-blocks' ),
		__( 'Site Settings', 'thirtysixbeech-blocks' ),
		'manage_options',
		'thirtysixbeech-site-settings',
		'thirtysixbeech_blocks_render_settings_page',
		'dashicons-admin-customizer',
		60
	);
}
add_action( 'admin_menu', 'thirtysixbeech_blocks_add_settings_page' );

function thirtysixbeech_blocks_register_settings() {
	foreach ( thirtysixbeech_blocks_logo_fields() as $key => $label ) {
		register_setting(
			'thirtysixbeech_blocks_settings',
			thirtysixbeech_blocks_logo_option_name( $key ),
			array(
				'type'              => 'integer',
				'sanitize_callback' => 'absint',
				'default'           => 0,
			)
		);
	}

	add_settings_section(
		'thirtysixbeech_blocks_general',
		__( 'General', 'thirtysixbeech-blocks' ),
		'__return_false',
		'thirtysixbeech-site-settings'
	);

	foreach ( thirtysixbeech_blocks_logo_fields() as $key => $label ) {
		add_settings_field(
			$key,
			$label,
			'thirtysixbeech_blocks_render_logo_field',
			'thirtysixbeech-site-settings',
			'thirtysixbeech_blocks_general',
			array( 'key' => $key )
		);
	}
}
add_action( 'admin_init', 'thirtysixbeech_blocks_register_settings' );

function thirtysixbeech_blocks_render_logo_field( $args ) {
	$key     = $args['key'];
	$logo_id = thirtysixbeech_blocks_get_logo_id( $key );
	$image   = $logo_id ? wp_get_attachment_image( $logo_id, 'medium' ) : '';
	?>
	<div class="thirtysixbeech-logo-field">
		<div class="thirtysixbeech-logo-preview" <?php echo $logo_id ? '' : 'style="display:none;"'; ?>>
			<?php echo $image; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>
		<input
			type="hidden"
			name="<?php echo esc_attr( thirtysixbeech_blocks_logo_option_name( $key ) ); ?>"
			class="thirtysixbeech-logo-id"
			value="<?php echo esc_attr( $logo_id ); ?>"
		/>
		<p>
			<button type="button" class="button thirtysixbeech-logo-select"><?php esc_html_e( 'Select Logo', 'thirtysixbeech-blocks' ); ?></button>
			<button type="button" class="button thirtysixbeech-logo-remove" <?php echo $logo_id ? '' : 'style="display:none;"'; ?>><?php esc_html_e( 'Remove Logo', 'thirtysixbeech-blocks' ); ?></button>
		</p>
		<p class="description"><?php esc_html_e( 'Recommended: an SVG or transparent PNG.', 'thirtysixbeech-blocks' ); ?></p>
	</div>
	<?php
}

function thirtysixbeech_blocks_render_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Site Settings', 'thirtysixbeech-blocks' ); ?></h1>
		<form action="options.php" method="post">
			<?php
			settings_fields( 'thirtysixbeech_blocks_settings' );
			do_settings_sections( 'thirtysixbeech-site-settings' );
			submit_button();
			?>
		</form>
	</div>
	<?php
}

function thirtysixbeech_blocks_settings_enqueue_assets( $hook ) {
	if ( 'toplevel_page_thirtysixbeech-site-settings' !== $hook ) {
		return;
	}

	wp_enqueue_media();

	wp_enqueue_style(
		'thirtysixbeech-blocks-settings',
		plugin_dir_url( __FILE__ ) . 'assets/site-settings.css',
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/site-settings.css' )
	);

	wp_enqueue_script(
		'thirtysixbeech-blocks-settings',
		plugin_dir_url( __FILE__ ) . 'assets/site-settings.js',
		array( 'jquery' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/site-settings.js' ),
		true
	);

	wp_localize_script(
		'thirtysixbeech-blocks-settings',
		'thirtysixbeechSettings',
		array(
			'chooseLogoTitle'  => __( 'Choose a logo', 'thirtysixbeech-blocks' ),
			'chooseLogoButton' => __( 'Use this logo', 'thirtysixbeech-blocks' ),
		)
	);
}
add_action( 'admin_enqueue_scripts', 'thirtysixbeech_blocks_settings_enqueue_assets' );

/**
 * REST API
 */
function thirtysixbeech_blocks_register_rest_routes() {
	register_rest_route(
		'thirtysixbeech/v1',
		'/logos',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'thirtysixbeech_blocks_rest_get_logos',
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		)
	);
}
add_action( 'rest_api_init', 'thirtysixbeech_blocks_register_rest_routes' );

function thirtysixbeech_blocks_rest_get_logos() {
	$logos = array();

	foreach ( array_keys( thirtysixbeech_blocks_logo_fields() ) as $key ) {
		$id            = thirtysixbeech_blocks_get_logo_id( $key );
		$logos[ $key ] = array(
			'id'  => $id ? $id : null,
			'url' => $id ? thirtysixbeech_blocks_get_logo_url( $key ) : null,
		);
	}

	return rest_ensure_response( $logos );
}

/**
 * Helpers for use elsewhere in the plugin/theme.
 */
function thirtysixbeech_blocks_get_logo_id( $type = 'logo' ) {
	return absint( get_option( thirtysixbeech_blocks_logo_option_name( $type ), 0 ) );
}

function thirtysixbeech_blocks_get_logo_url( $type = 'logo', $size = 'full' ) {
	$logo_id = thirtysixbeech_blocks_get_logo_id( $type );
	if ( ! $logo_id ) {
		return '';
	}
	$url = wp_get_attachment_image_url( $logo_id, $size );
	return $url ? $url : '';
}

/**
 * Renders a logo option as markup: inline (sanitized) SVG for SVG attachments,
 * an <img> tag otherwise.
 *
 * @param string $type  Logo option key, e.g. 'logo', 'mobile_logo', 'footer_logo'.
 * @param string $size  Image size to use for non-SVG attachments.
 * @param string $class Extra class name(s) to add to the <img> tag, on top of
 *                       the defaults (added, not replacing them). Has no
 *                       effect on SVG attachments, which are rendered as-is.
 * @param array  $attr  Extra <img> attributes for non-SVG attachments (merged over defaults).
 * @return string Markup, or '' if no logo is set.
 */
function thirtysixbeech_blocks_get_logo_markup( $type = 'logo', $size = 'medium', $class = '', $attr = array() ) {
	$logo_id = thirtysixbeech_blocks_get_logo_id( $type );

	if ( ! $logo_id ) {
		return '';
	}

	if ( thirtysixbeech_blocks_is_svg_attachment( $logo_id ) ) {
		return thirtysixbeech_blocks_get_svg_markup( $logo_id );
	}

	$attr = wp_parse_args(
		$attr,
		array(
			'class'    => 'w-full block',
			'loading'  => 'lazy',
			'decoding' => 'async',
		)
	);

	if ( $class ) {
		$attr['class'] = trim( $attr['class'] . ' ' . $class );
	}

	return wp_get_attachment_image( $logo_id, $size, false, $attr );
}
