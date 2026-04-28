/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "react";

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
import {
	PanelBody,
	ToolbarButton,
	ToggleControl,
	BaseControl,
} from "@wordpress/components";

import { Stack } from "@wordpress/ui";
import { wpPresetToCssVar } from "@shared/util";
import { Breakpoints, AlignItems } from "@shared/react";

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

import {
	flexClasses,
	justification,
} from "@shared/flex-grid-classes";

export default function Edit({ attributes, setAttributes }) {
	const {
		evenColumns,
		reverse,
		justifyContent = "justify-start",
		alignItems = "items-start",
		breakpoint = "md",
		blockGap,
		style,
	} = attributes;
	const currentBlockGap = wpPresetToCssVar(style?.spacing?.blockGap?.left);

	useEffect(() => {
		setAttributes({ blockGap: currentBlockGap });
	}, [currentBlockGap]);

	const innerClasses = [
		flexClasses[breakpoint],
		"tsb-inner-blocks",
		justifyContent,
		alignItems,
	];
	if (reverse) innerClasses.push("flex-row");

	const blockProps = useBlockProps();

	const innerStyles = {
		marginLeft: `calc( ${blockGap} * -1 )`,
		marginRight: `calc( ${blockGap} * -1 )`,
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Layout Options", "thirtysix-beech")}>
					<Stack direction="column">
						<ToggleControl
							label={__("Even Columns", "thirtysix-beech")}
							checked={evenColumns}
							help={__("All flex items will be equal width", "thirtysix-beech")}
							onChange={(newValue) => {
								setAttributes({
									evenColumns: newValue,
								});
							}}
						/>
						<ToggleControl
							label={__("Reverse", "thirtysix-beech")}
							checked={reverse}
							help={__("Reverse on mobile devices.")}
							onChange={(newValue) => {
								setAttributes({
									reverse: newValue,
								});
							}}
						/>
						<BaseControl label="Justify Content">
							<Stack alignment="center">
								{justification.map((item) => (
									<ToolbarButton
										icon={item.icon}
										label={item.label}
										isPressed={justifyContent === item.value}
										onClick={() =>
											setAttributes({
												justifyContent: item.value,
											})
										}
									/>
								))}
							</Stack>
						</BaseControl>

						<AlignItems
							value={alignItems}
							onClick={(newValue) =>
								setAttributes({
									alignItems: newValue,
								})
							}
						/>

						<Breakpoints
							label="Breakpoints"
							value={breakpoint}
							onClick={() => {
								console.log("hi");
							}}
						/>
					</Stack>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className={innerClasses.join(" ")} style={innerStyles}>
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
