/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToolbarButton, SelectControl, RangeControl, ToggleControl } from "@wordpress/components";
import { justifyLeft, justifyCenter, justifyRight, justifySpaceBetween } from "@wordpress/icons";
import { justifyTop, justifyCenterVertical, justifyBottom, justifyStretch } from "@wordpress/icons";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const classes = ['flex'];

	return (
		<div { ...useBlockProps({ className: classes.join(' ') }) }>
			{ __( 'Flexbox – hello from the editor!', 'flexbox' ) }
		</div>
	);
}
