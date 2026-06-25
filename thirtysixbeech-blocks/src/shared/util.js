/**
 * Convert a WordPress preset token into a usable CSS variable.
 *
 * WordPress stores preset-based values (from theme.json) in the format:
 *   "var:preset|{feature}|{slug}"
 *
 * Example:
 *   "var:preset|spacing|50"
 *
 * This function converts that into the corresponding CSS custom property:
 *   "var(--wp--preset--{feature}--{slug})"
 *
 * Example:
 *   "var(--wp--preset--spacing--50)"
 *
 * If the value is already a standard CSS value (e.g. "1rem", "24px"),
 * it is returned unchanged.
 *
 * If the value is invalid, empty, or not a string, an empty string is returned.
 *
 * @param {string} value - The raw spacing value from block attributes (e.g. attributes.style.spacing.blockGap)
 * @returns {string} A valid CSS value or CSS variable reference
 */

export const wpPresetToCssVar = ( value ) => {
	if ( typeof value !== "string" || !value.trim() ) {
		return null;
	}

	if ( !value.startsWith( "var:preset|" ) ) {
		return value;
	}

	const parts = value.split( "|" );

	if (parts.length !== 3) {
		return value;
	}

	const [, feature, slug] = parts;

	return `var(--wp--preset--${feature}--${slug})`;
};
