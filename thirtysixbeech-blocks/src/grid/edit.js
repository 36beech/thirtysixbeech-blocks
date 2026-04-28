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
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from "@wordpress/block-editor";
import { Stack } from "@wordpress/ui";
import {
	PanelBody,
	ToggleControl,
} from "@wordpress/components";
import { Breakpoints, AlignItems } from "@shared/react";
import { wpPresetToCssVar } from "@shared/util";

import { alignment } from "@shared/flex-grid-classes";

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

export default function Edit({ attributes, setAttributes }) {
	const blockGapX = wpPresetToCssVar(attributes?.style?.spacing?.blockGap?.left);
	const blockGapY = wpPresetToCssVar(attributes?.style?.spacing?.blockGap?.top);
	const { breakpoint, reverse, alignItems = "tsb-a-start" } = attributes;

	const breakpointClass = [];

	switch (breakpoint) {
		case "mobile":
			breakpointClass.push("max-sm:flex max-sm:flex-col sm:grid");
			if (reverse) breakpointClass.push("sm:tsb-rtl");
			break;
		case "tablet":
		default:
			breakpointClass.push("max-md:flex max-md:flex-col md:grid");
			if (reverse) breakpointClass.push("md:tsb-rtl");
			break;
		case "desktop":
			breakpointClass.push("max-lg:flex max-lg:flex-col lg:grid");
			if (reverse) breakpointClass.push("lg:tsb-rtl");
			break;
	}

	const gridClasses = [...breakpointClass, "grid-cols-12 grid-wrapper"];
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Grid Options", "thirtysix-beech")}>
					<Stack direction="column">
						<Breakpoints
							label="Breakpoints"
							value={breakpoint}
							onClick={() => {
								console.log("hi");
							}}
						/>
						<AlignItems
							value={alignItems}
							onClick={(newValue) =>
								setAttributes({
									alignItems: newValue,
								})
							}
						/>
						<ToggleControl
							label={__("Reverse Horizontally", "thirtysix-beech")}
							checked={reverse}
							help={__("Reverse Direction", "thirtysix-beech")}
							onChange={(newValue) => {
								setAttributes({
									reverse: newValue,
								});
							}}
						/>
					</Stack>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({
					className: `relative`,
				})}
			>
				<div
					className={[...gridClasses, alignItems,  "relative z-10"].join(" ")}
					style={{ columnGap: blockGapX, rowGap: blockGapY }}
				>
					<InnerBlocks allowedBlocks={["thirtysixbeech-blocks/grid-item"]} />
				</div>
				<div
					className={[
						...gridClasses,
						"absolute top-0 left-0 w-full h-full z-0",
						"grid-backdrop"
					].join(" ")}
					style={{ columnGap: blockGapX, rowGap: blockGapY }}
				>
					{Array.from({ length: 12 }).map((_, i) => (
						<div key={i} className="column-indicator"></div>
					))}
				</div>
			</div>
		</>
	);
}
