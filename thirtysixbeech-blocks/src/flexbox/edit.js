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
import {
	PanelBody,
	ToolbarButton,
	RangeControl,
	ToggleControl,
	BaseControl,
} from "@wordpress/components";

import { Stack } from "@wordpress/ui";

import { mobile, tablet, desktop } from "@wordpress/icons";

const breakpoints = [
	{ label: "Mobile", value: "all", icon: mobile },
	{ label: "Tablet", value: "md", icon: tablet },
	{ label: "Desktop", value: "lg", icon: desktop },
];

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
	alignment,
} from "@shared/flex-grid-classes";

export default function Edit({ attributes, setAttributes }) {
	const {
		evenColumns,
		reverse,
		justifyContent = "tsb-j-start",
		alignItems = "tsb-a-start",
		breakpoint = "md",
		gap = "sm",
	} = attributes;

	const innerClasses = [flexClasses[breakpoint], "tsb-inner-blocks", justifyContent, alignItems];
	if( reverse ) innerClasses.push( 'tsb-flex-row-r' );

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

						<BaseControl label="Align Items">
							<Stack alignment="center">
								{alignment.map((item) => (
									<ToolbarButton
										icon={item.icon}
										label={item.label}
										isPressed={alignItems === item.value}
										onClick={() =>
											setAttributes({
												alignItems: item.value,
											})
										}
									/>
								))}
							</Stack>
						</BaseControl>

						<BaseControl label="Breakpoints">
							<Stack alignment="center">
								{breakpoints.map((item) => (
									<ToolbarButton
										icon={item.icon}
										label={item.label}
										isPressed={breakpoint === item.value}
										onClick={() =>
											setAttributes({
												breakpoint: item.value,
											})
										}
									/>
								))}
							</Stack>
						</BaseControl>
					</Stack>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps( { className: innerClasses.join(" ") })}>
					<InnerBlocks />
			</div>
		</>
	);
}
