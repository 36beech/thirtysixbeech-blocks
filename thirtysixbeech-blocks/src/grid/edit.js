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
import { PanelBody } from "@wordpress/components";
import { Breakpoints } from "@shared/react";
import { wpPresetToCssVar } from "@shared/util";

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
	const blockGap = wpPresetToCssVar(attributes?.style?.spacing?.blockGap?.left);
	const { breakpoint } = attributes;

	let breakpointClass;

	switch (breakpoint) {
		case "mobile":
			breakpointClass = "max-sm:tsb-flex max-sm:tsb-flex-col sm:tsb-grid";
			break;
		case "tablet":
		default:
			breakpointClass = "max-md:tsb-flex max-md:tsb-flex-col md:tsb-grid";
			break;
		case "desktop":
			breakpointClass = "max-lg:tsb-flex max-lg:tsb-flex-col lg:tsb-grid";
			break;
	}

	const gridClasses = breakpointClass + " tsb-grid-cols-12 tsb-grid-wrapper";
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Grid Options", "thirtysix-beech")}>
					<Breakpoints
						label="Breakpoints"
						value={breakpoint}
						onClick={() => {
							console.log("hi");
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({
					className: `tsb-rel`,
				})}
			>
				<div
					className={[gridClasses, "tsb-rel z-10"].join(" ")}
					style={{ gap: blockGap }}
				>
					<InnerBlocks allowedBlocks={["thirtysixbeech-blocks/grid-item"]} />
				</div>
				<div
					className={[
						gridClasses,
						"tsb-abs top-0 left-0 w-full h-full z-0",
					].join(" ")}
					style={{ gap: blockGap }}
				>
					{Array.from({ length: 12 }).map((_, i) => (
						<div key={i} className="column-indicator"></div>
					))}
				</div>
			</div>
		</>
	);
}
