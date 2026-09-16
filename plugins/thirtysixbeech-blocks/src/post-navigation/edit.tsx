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
import { InputControl, Stack } from '@wordpress/ui';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { Attributes } from './models/attributes';

interface EditProps {
	attributes: Attributes;
	setAttributes: ( attributes: Partial< Attributes > ) => void;
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes }: EditProps ) {
	const { viewAll, prevPrefix, prevSuffix, nextPrefix, nextSuffix } =
		attributes;

	return (
		<>
			<InspectorControls>
				<Panel header="Post Navigation Settings">
					<PanelBody>
						<Stack gap="md" direction="column">
							<InputControl
								label={ __( 'Archive Link Label' ) }
								value={ viewAll }
								onValueChange={ ( value ) => {
									setAttributes( { viewAll: value } );
								} }
							/>
							<InputControl
								label={ __( 'Previous Link Prefix' ) }
								value={ prevPrefix }
								onValueChange={ ( value ) => {
									setAttributes( {
										prevPrefix: value,
									} );
								} }
							/>
							<InputControl
								label={ __( 'Previous Link Suffix' ) }
								value={ prevSuffix }
								onValueChange={ ( value ) => {
									setAttributes( {
										prevSuffix: value,
									} );
								} }
							/>
							<InputControl
								label={ __( 'Next Link Prefix' ) }
								value={ nextPrefix }
								onValueChange={ ( value ) => {
									setAttributes( {
										nextPrefix: value,
									} );
								} }
							/>
							<InputControl
								label={ __( 'Next Link Suffix' ) }
								value={ nextSuffix }
								onValueChange={ ( value ) => {
									setAttributes( {
										nextSuffix: value,
									} );
								} }
							/>
						</Stack>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<p { ...useBlockProps() }>
				{ __(
					'Post Navigation – hello from the editor!',
					'post-navigation'
				) }
			</p>
		</>
	);
}
