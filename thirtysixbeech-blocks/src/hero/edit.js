/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { MediaSelector } from "@shared/react";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, context }) {
	const { imageId } = attributes;
	const allowedBlocks = ["core/heading", "core/paragraph", "core/buttons"];
	return (
		<div {...useBlockProps()}>
			<div className="tsb-hero-image">
				<MediaSelector
					value={imageId}
					onSelect={(item) => {
						setAttributes({
							imageId: item.id,
						});
					}}
				/>
			</div>
			<div className="tsb-hero-content">
				<div className="tsb-inner-blocks">
					<InnerBlocks allowedBlocks={allowedBlocks} />
				</div>
			</div>
		</div>
	);
}
