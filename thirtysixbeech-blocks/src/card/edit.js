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
	RichText,
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
	const { imageId, tags } = attributes;

	const blockGap = context["thirtysixbeech/blockGap"] || 0;
	const evenColumns = context["thirtysixbeech/evenColumns"] || false;

	const className = ["tsb-rel"];
	if (evenColumns) className.push("tsb-flex-1");

	const styles = {
		paddingLeft: blockGap,
		paddingRight: blockGap,
	};

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Cards Options", "thirtysix-beech")}>
					<BaseControl label={__("Variant", "thirtysix-beech")}>
						<Stack justify="center" gap="md">
							<Button>
								<VerticalIcon style={{ width: "40px", height: "40px" }} />
							</Button>
							<Button variant="outline" tone="neutral">
								<HorizontalIcon style={{ width: "40px", height: "40px" }} />
							</Button>
						</Stack>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div className={className.join(" ")} style={styles}>
				<div {...blockProps}>
					<div className="card-image" style={{ aspectRatio: "5 / 3" }}>
						<MediaSelector
							value={imageId}
							onSelect={(item) => {
								setAttributes({
									imageId: item.id,
								});
							}}
						/>
					</div>
					<div className="tsb-abs top-0 left-0 z-20">
						<RichText
							placeholder="Tags"
							value={tags[0]}
							onChange={(newValue) => setAttributes({ tags: [newValue] })}
						/>
					</div>
					<div className="card-body">
						<div className="tsb-inner-blocks">
							<InnerBlocks />
						</div>
					</div>
					<div className="card-footer"></div>
				</div>
			</div>
		</>
	);
}
