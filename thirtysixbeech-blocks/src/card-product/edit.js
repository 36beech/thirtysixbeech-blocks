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
	PlainText,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, BaseControl } from "@wordpress/components";
import { Stack, Button } from "@wordpress/ui";
import { MediaSelector } from "@shared/react";

import { ReactComponent as VerticalIcon } from "./cards_vertical.svg";
import { ReactComponent as HorizontalIcon } from "./cards_horizontal.svg";

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
	const { imageId, productTag, productTitle, productDescription } = attributes;

	const blockGap = context["thirtysixbeech/blockGap"] || 0;
	const evenColumns = context["thirtysixbeech/evenColumns"] || false;

	const blockStyles = ["relative", "h-full"];
	if (evenColumns) blockStyles.push("flex-1");

	const styles = {
		paddingLeft: blockGap,
		paddingRight: blockGap,
	};

	const blockProps = useBlockProps({
		className: blockStyles.join(" "),
		styles: styles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Cards Options", "thirtysix-beech")}></PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="max-md:flex max-md:flex-col md:grid grid-cols-12 gap-4">
					<div className="relative col-span-7">
						<div className="h-full">
							<MediaSelector
								value={imageId}
								onSelect={(item) => {
									setAttributes({
										imageId: item.id,
									});
								}}
							/>
						</div>
						<div className="absolute top-0 left-0">
							<PlainText
								className="product-hero-header__tag border border-dotted border-slate-700 m-0"
								value={productTag}
								placeholder="Great"
								onChange={(newValue) => setAttributes({ productTag: newValue })}
							/>
							<PlainText
								className="product-header__title border border-dotted border-slate-700 m-0"
								value={productTitle}
								placeholder="Series Title"
								onChange={(newValue) =>
									setAttributes({ productTitle: newValue })
								}
							/>
							<PlainText
								className="product-header__description border border-dotted border-slate-700 m-0"
								value={productDescription}
								placeholder="Series Description"
								onChange={(newValue) =>
									setAttributes({ productDescription: newValue })
								}
							/>
						</div>
					</div>
					<div className="col-span-5">
						<div className="tsb-inner-blocks">
							<InnerBlocks />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
