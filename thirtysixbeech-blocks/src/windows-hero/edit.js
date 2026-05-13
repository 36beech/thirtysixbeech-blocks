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
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { MediaSelector } from "@shared/react";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

import { useImage } from "@shared/react/useImage";

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
	const image = useImage(imageId);
	const sourceUrl = image?.media_details?.sizes?.medium_large?.source_url;
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Hero Image")}>
					<div className="aspect-[1440/424]">
						<MediaSelector
							value={imageId}
							onSelect={(item) => {
								setAttributes({
									imageId: item.id,
								});
							}}
						/>
					</div>
				</PanelBody>
			</InspectorControls>
			<header {...useBlockProps()}>
				<div className="aspect-[1440/424] grid grid-cols-1 grid-rows-2">
					{sourceUrl && (
						<div className="relative z-0 row-start-1 row-span-2 col-start-1">
							<img
								src={sourceUrl}
								className="w-full h-full object-cover relative z-0"
							/>
						</div>
					)}
					<div className="row-start-2 col-start-1 relative z-10 is-layout-constrained has-global-padding self-end">
						<div>Hi?</div>
					</div>
				</div>
			</header>
		</>
	);
}
