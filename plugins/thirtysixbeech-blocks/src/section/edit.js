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
	BlockControls,
	InspectorControls,
} from "@wordpress/block-editor";
import {
	ToolbarGroup,
	ToolbarDropdownMenu,
	PanelBody,
	ToggleControl,
	BaseControl,
	RangeControl,
} from "@wordpress/components";

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
import { Section } from "@shared/react/Section";
import { ColorSelector } from "@shared/react";

export default function Edit({ attributes, setAttributes }) {
	const {
		semanticTag,
		hasPartialBackground,
		partialBackgroundColor,
		partialBackgroundCoverage,
	} = attributes;

	const TAGS = [
		{
			key: "section",
			icon: "<section />",
			label: __("Section", "thitysixbeech-blocks"),
		},
		{
			key: "header",
			icon: "<header />",
			label: __("Header", "thirtysixbeech-blocks"),
		},
		{
			key: "footer",
			icon: "<footer />",
			label: __("Footer", "thirtysixbeech-blocks"),
		},
		{
			key: "article",
			icon: "<article />",
			label: __("Article", "thirtysixbeech-blocks"),
		},
		{
			key: "div",
			icon: "<div />",
			label: __("Div", "thirtysixbeech-blocks"),
		},
	];

	const options = TAGS.map(({ key, icon, label }) => ({
		icon: (
			<div style={{ width: "96px", textAlign: "center" }}>
				<code>{icon}</code>
			</div>
		),
		title: label,
		onClick: () => setAttributes({ semanticTag: key }),
		isActive: semanticTag === key,
	}));

	const SelectedIcon = ({ tag }) => {
		const match = TAGS.find((t) => t.key === tag) || TAGS[0];
		return <code>{tag}</code>;
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Background Element")}>
					<ToggleControl
						label={__("Has background element")}
						checked={hasPartialBackground}
						onChange={() =>
							setAttributes({ hasPartialBackground: !hasPartialBackground })
						}
						__nextHasNoMarginBottom
					></ToggleControl>
					{hasPartialBackground && (
						<>
							<BaseControl
								label={__("Background Element Color")}
								__nextHasNoMarginBottom
							>
								<ColorSelector
									value={partialBackgroundColor}
									onChange={(color) => {
										setAttributes({ partialBackgroundColor: color });
									}}
								/>
							</BaseControl>
							<RangeControl
								label={__("Background Element Percentage")}
								value={partialBackgroundCoverage}
								max={100}
								min={0}
								onChange={(newValue) =>
									setAttributes({ partialBackgroundCoverage: newValue })
								}
								__nextHasNoMarginBottom
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={<SelectedIcon tag={semanticTag} />}
						label={__("HTML tag", "thirtysixbeech-blocks")}
						text={(semanticTag || "section").toLowerCase()}
						controls={options}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...useBlockProps()}>
				<Section tag={semanticTag} className="relative z-10">
					<div className="tsb-inner-blocks">
						<InnerBlocks />
					</div>
				</Section>
				{hasPartialBackground && (
					<div
						className="absolute bottom-0 left-0 w-full"
						style={{
							height: `${partialBackgroundCoverage}%`,
							background: partialBackgroundColor,
						}}
					></div>
				)}
			</div>
		</>
	);
}
