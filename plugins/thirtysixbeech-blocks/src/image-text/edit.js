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
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { MediaSelector } from '../shared/react/MediaSelector';
import { Grid, GridItem } from '../shared/react/Grid';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
const ImageGroup = ( { imageLayout, children } ) => {
	if ( imageLayout === '1x1' ) return <>{ children }</>;

	return (
		<div className="grid grid-cols-2 grid-rows-2 gap-tsb">{ children }</div>
	);
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		backgroundImage,
		reversed,
		imageLayout = '1x1',
		image2,
		image3,
		image4,
	} = attributes;
	return (
		<>
			<InspectorControls group="styles">
				<Panel title={ __( 'Cards Options', 'thirtysix-beech' ) }>
					<PanelBody>
						<ToggleControl
							label={ __( 'Reverse' ) }
							checked={ reversed }
							help={ __(
								'Toggle between Text Left/Image Right and Text Right/Image Left'
							) }
							onChange={ () =>
								setAttributes( { reversed: ! reversed } )
							}
						/>
						<ToggleGroupControl
							label={ __( 'Image Layout' ) }
							value={ imageLayout }
							onChange={ ( value ) =>
								setAttributes( { imageLayout: value } )
							}
							isBlock
						>
							<ToggleGroupControlOption
								label={ __( '1 x 1' ) }
								value="1x1"
							/>
							<ToggleGroupControlOption
								label={ __( '2 x 2' ) }
								value="2x2"
							/>
						</ToggleGroupControl>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<Grid className="items-center">
					{ ! reversed && (
						<GridItem columnSpan={ 4 }>
							<InnerBlocks />
						</GridItem>
					) }
					<GridItem columnSpan={ 8 }>
						<ImageGroup imageLayout={ imageLayout }>
							<MediaSelector
								value={ backgroundImage }
								onSelect={ ( item ) => {
									setAttributes( {
										backgroundImage: item.id,
									} );
								} }
							/>
							{ imageLayout === '2x2' && (
								<>
									<MediaSelector
										value={ image2 }
										onSelect={ ( item ) => {
											setAttributes( {
												image2: item.id,
											} );
										} }
									/>
									<MediaSelector
										value={ image3 }
										onSelect={ ( item ) => {
											setAttributes( {
												image3: item.id,
											} );
										} }
									/>
									<MediaSelector
										value={ image4 }
										onSelect={ ( item ) => {
											setAttributes( {
												image4: item.id,
											} );
										} }
									/>
								</>
							) }
						</ImageGroup>
					</GridItem>
					{ reversed && (
						<GridItem columnSpan={ 4 }>
							<InnerBlocks />
						</GridItem>
					) }
				</Grid>
			</div>
		</>
	);
}
