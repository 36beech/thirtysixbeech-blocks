/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, BaseControl } from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { Grid, GridItem } from '../shared/react/Grid';
import { ColumnButton } from '../shared/react/ColumnButton';
import { MediaSelector } from '../shared/react/MediaSelector';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const GalleryRow = ({columns, slot1, slot2}) => {
	if( !columns ) return;
	if( columns === 1 ) {
		return <div className="col-span-12 p-1">{slot1}</div>;
	}
	if( columns === 2) {
		return <>
			<div className="col-span-6 p-1">{slot1}</div>
			<div className="col-span-6 p-1">{slot2}</div>
		</>;
	}
	if( columns === "33/66") {
		return <>
			<div className="col-span-4 p-1">{slot1}</div>
			<div className="col-span-8 p-1">{slot2}</div>
		</>;
	}
	if( columns === "66/33") {
		return <>
			<div className="col-span-8 p-1">{slot1}</div>
			<div className="col-span-4 p-1">{slot2}</div>
		</>;
	}
	return;
};

export default function Edit({ attributes, setAttributes }) {
	const {columns, image1, image2} = attributes;

	if( !columns ) {
		return (
			<div { ...useBlockProps() }>
				<h3 className="text-center mb-4">Please select the number of columns</h3>
				<Grid>
					<GridItem><ColumnButton columns={1} onClick={() => setAttributes({ columns: 1 })} /></GridItem>
					<GridItem><ColumnButton columns="33/66" label={__("33/66")} onClick={() => setAttributes({ columns: "33/66" })} /></GridItem>
					<GridItem><ColumnButton columns={2} onClick={() => setAttributes({ columns: 2 })} /></GridItem>
					<GridItem><ColumnButton columns="66/33" label={__("66/33")} onClick={() => setAttributes({ columns: "66/33" })} /></GridItem>
				</Grid>
			</div>
		)
	}

	return (
		<>
			<InspectorControls>
				<Panel header="Gallery Row Settings">
					<PanelBody>
						<BaseControl label={__("Number of columns")}>
							<div className="grid grid-cols-2 gap-2.5">
								<div><ColumnButton columns={1} onClick={() => setAttributes({ columns: 1 })} size="small" selected={columns === 1} /></div>
								<div><ColumnButton columns="33/66" label={__("33/66")} onClick={() => setAttributes({ columns: "33/66" })} size="small" selected={columns === "33/66"} /></div>
								<div><ColumnButton columns={2} onClick={() => setAttributes({ columns: 2 })} size="small" selected={columns === 2} /></div>
								<div><ColumnButton columns="66/33" label={__("66/33")} onClick={() => setAttributes({ columns: "66/33"})} size="small" selected={columns === "66/33"} /></div>
							</div>
						</BaseControl>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<div className="tsb-gallery-row grid grid-cols-12 gap-tsb py-4 min-h-100 border border-gray-100">
					<GalleryRow 
						columns={columns}
						slot1={(
							<MediaSelector 
								value={image1} 
								onSelect={(item) => {
									setAttributes({
										image1: item.id,
									});
								}}
								className="tsb-hero__image"
							/>
						)}
						slot2={(
							<MediaSelector 
								value={image2} 
								onSelect={(item) => {
									setAttributes({
										image2: item.id,
									});
								}}
								className="tsb-hero__image"
							/>
						)}
					/>
				</div>
			</div>
		</>
	);
}
