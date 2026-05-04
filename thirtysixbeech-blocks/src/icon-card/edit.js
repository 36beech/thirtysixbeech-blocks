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
import { useBlockProps, PlainText } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { MediaSelector } from "@shared/react";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { cardText, cardIcon } = attributes;
	return (
		<div {...useBlockProps()}>
			<div className="flex gap-7.5 items-center">
				<div className="grow-0 shrink-0 icon-card-icon border border-dotted border-gray-300">
					<div className="aspect-square w-11.25">
						<MediaSelector
							value={cardIcon}
							onSelect={(item) => {
								setAttributes({
									cardIcon: item.id,
								});
							}}
						/>
					</div>
				</div>
				<div className="flex-1 icon-card-content border border-dotted border-gray-300">
					<PlainText
						value={cardText}
						onChange={(newVal) => setAttributes({ cardText: newVal })}
						placeholder="Hurricane-prone coastal environments."
					/>
				</div>
			</div>
		</div>
	);
}
