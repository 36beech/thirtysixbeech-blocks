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
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

// Defined once at module scope rather than inline in the JSX below: passing
// InnerBlocks a fresh array reference on every render makes it think the
// allowed-blocks configuration changed and re-synchronize its contents
// against it, which — with no `template` to fall back to — clears out
// whatever's already inside. This block's Edit() re-renders on selection
// changes anywhere in the editor (e.g. clicking into a child Social Link's
// URL field), not just its own attribute changes, so this bites often.
const ALLOWED_BLOCKS = [ 'thirtysixbeech-blocks/social-link' ];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<div className="tsb-inner-blocks flex gap-3">
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>
		</div>
	);
}
