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

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {columns} = attributes;
	console.log(columns);
	if( !columns ) {
		return (
			<div { ...useBlockProps() }>
				<h3 className="text-center mb-4">Please select the number of columns</h3>
				<Grid>
					<GridItem><ColumnButton columns={2} onClick={() => setAttributes({ columns: 2 })} /></GridItem>
					<GridItem><ColumnButton columns={3} onClick={() => setAttributes({ columns: 3 })} /></GridItem>
					<GridItem><ColumnButton columns={4} onClick={() => setAttributes({ columns: 4 })} /></GridItem>
					<GridItem><ColumnButton columns="flex" label={__("Flex Count")} onClick={() => setAttributes({ columns: "flex" })} /></GridItem>
				</Grid>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<Panel header="Card Group Settings">
					<PanelBody>
						<BaseControl
							label={__("Number of columns")}
						>
							<div className="grid grid-cols-2 gap-2.5">
								<div><ColumnButton columns={2} onClick={() => setAttributes({ columns: 2 })} size="small" /></div>
								<div><ColumnButton columns={3} onClick={() => setAttributes({ columns: 3 })} size="small" /></div>
								<div><ColumnButton columns={4} onClick={() => setAttributes({ columns: 4 })} size="small" /></div>
								<div><ColumnButton columns="flex" label={__("Flex Count")} onClick={() => setAttributes({ columns: "flex" })} size="small" /></div>
							</div>
						</BaseControl>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<p>Columns: {columns}</p>
			</div>
		</>
	);
}
