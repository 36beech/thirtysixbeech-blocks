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
import { useBlockProps, InnerBlocks, PlainText } from "@wordpress/block-editor";

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
	const { imageId, stinger } = attributes;
	return (
		<div {...useBlockProps()}>
			<div className="grid grid-cols-12">
				<div className="col-span-8">
					<MediaSelector
						value={imageId}
						onSelect={(item) => {
							setAttributes({
								imageId: item.id,
							});
						}}
					/>
				</div>
				<div class="col-span-4">
					<div className="h-full flex flex-col">
						<div className="image-and-text-stinger text-right">
							<PlainText
								className="text-right"
								value={stinger}
								placeholder="Tag"
								onChange={(newValue) => setAttributes({ stinger: newValue })}
							/>
						</div>
						<div className="grow flex flex-col justify-center">
							<div className="tsb-inner-blocks">
								<InnerBlocks />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
