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
import { PanelBody, ToggleControl, RangeControl } from "@wordpress/components";
import { Stack } from "@wordpress/ui";

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
	const { autoPlay, autoPlayDelay } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Carousel Options", "thirtysix-beech")}>
					<Stack
						direction="column"
						style={{
							margin: "1rem 0",
							padding: "1rem 0",
							borderBottom: "1px solid #656569",
						}}
					>
						<ToggleControl
							label={__("Auto Play", "thirtysix-beech")}
							checked={autoPlay}
							onChange={() => {
								setAttributes({ autoPlay: !autoPlay });
							}}
						/>
						{autoPlay && (
							<RangeControl
								label={__("Auto Play Delay", "thirtysix-beech")}
								value={autoPlayDelay}
								min={0}
								max={10000}
								step={100}
								onChange={(value) => setAttributes({ autoPlayDelay: value })}
							/>
						)}
					</Stack>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<InnerBlocks allowedBlocks={["thirtysixbeech-blocks/hero"]} />
			</div>
		</>
	);
}
