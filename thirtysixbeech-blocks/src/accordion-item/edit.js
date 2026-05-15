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
import { InnerBlocks, useBlockProps, RichText } from "@wordpress/block-editor";
import { ReactComponent as Carat } from "./carat.svg";

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
	const { summary } = attributes;

	return (
		<details {...useBlockProps()}>
			<summary className="tsb-accordion-summary flex justify-between">
				<span>
					<RichText
						value={summary}
						onChange={(newVal) => setAttributes({ summary: newVal })}
						placeholder="Accordion Item Title"
					/>
				</span>
				<Carat className="tsb-accordion-summary-carat w-4.25 h-2.5" />
			</summary>
			<div className="tsb-accordion-content">
				<div className="tsb-inner-blocks">
					<InnerBlocks />
				</div>
			</div>
		</details>
	);
}
