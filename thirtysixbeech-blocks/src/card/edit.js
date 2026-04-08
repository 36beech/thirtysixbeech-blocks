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
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { MediaSelector } from "@shared/react";

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
	const { imageId } = attributes;

	const blockGap = context["thirtysixbeech/blockGap"] || 0;
	const evenColumns = context["thirtysixbeech/evenColumns"] || false;

	const className = [];
	if (evenColumns) className.push("tsb-flex-1");

	const styles = {
		paddingLeft: blockGap,
		paddingRight: blockGap,
	};

	const blockProps = useBlockProps();

	return (
		<div className={className.join(" ")} style={styles}>
			<div {...blockProps}>
				<div className="card-image">
					<MediaSelector
						value={imageId}
						onSelect={(item) => {
							setAttributes({
								imageId: item.id,
							});
						}}
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
	);
}
