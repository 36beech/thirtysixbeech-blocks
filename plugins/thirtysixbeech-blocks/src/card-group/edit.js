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
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { Panel, PanelBody } from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { ColumnButtons } from '../shared/react/ColumnButton';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const columnOptions = [
	{
		columns: 2,
	},
	{
		columns: 3,
	},
	{
		columns: 4,
	},
	{
		columns: 'flex',
		label: __( 'Flex Count' ),
	},
];

export default function Edit( { attributes, setAttributes } ) {
	const { columns } = attributes;

	const groupClasses = () => {
		const groupClasses = ' gap-tsb tsb-flex-wrapper';
		if ( columns === 'flex' ) return '' + groupClasses;

		switch ( columns ) {
			case 2:
				return 'grid grid-cols-2' + groupClasses;
			case 3:
				return 'grid grid-cols-3' + groupClasses;
			case 4:
				return 'grid grid-cols-4' + groupClasses;
		}
	};

	if ( ! columns ) {
		return (
			<div { ...useBlockProps() }>
				<h3 className="text-center mb-4">
					Please select the number of columns
				</h3>
				<ColumnButtons
					location="editor"
					options={ columnOptions }
					selected={ columns }
					onSelect={ ( value ) =>
						setAttributes( { columns: value } )
					}
				/>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<Panel header="Card Group Settings">
					<PanelBody>
						<ColumnButtons
							options={ columnOptions }
							selected={ columns }
							onSelect={ ( value ) =>
								setAttributes( { columns: value } )
							}
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<div className="tsb-inner-blocks">
					<div className={ groupClasses() }>
						<InnerBlocks
							allowedBlocks={ [ 'thirtysixbeech-blocks/card' ] }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
