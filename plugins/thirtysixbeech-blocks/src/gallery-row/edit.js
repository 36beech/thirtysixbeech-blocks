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
import {
	Panel,
	PanelBody,
	BaseControl,
	FocalPointPicker,
	Spinner,
} from '@wordpress/components';
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
import { useImage } from '../shared/react/useImage';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const setFocalPoint = ( focalPoint = { x: 0.5, y: 0.5 } ) => {
	const { x, y } = focalPoint;
	return `${ Math.round( x * 100 ) }% ${ Math.round( y * 100 ) }%`;
};

const GalleryRow = ( { columns, slot1, slot2, slot3 } ) => {
	if ( ! columns ) return;
	if ( columns === 1 ) {
		return <div className="col-span-12 p-1">{ slot1 }</div>;
	}
	if ( columns === 2 ) {
		return (
			<>
				<div className="col-span-6 p-1">{ slot1 }</div>
				<div className="col-span-6 p-1">{ slot2 }</div>
			</>
		);
	}
	if ( columns === '33/66' ) {
		return (
			<>
				<div className="col-span-4 p-1">{ slot1 }</div>
				<div className="col-span-8 p-1">{ slot2 }</div>
			</>
		);
	}
	if ( columns === '66/33' ) {
		return (
			<>
				<div className="col-span-8 p-1">{ slot1 }</div>
				<div className="col-span-4 p-1">{ slot2 }</div>
			</>
		);
	}
	if ( columns === '33/66/2' ) {
		return (
			<>
				<div className="col-span-8 row-span-2 p-1 col-start-5 row-start-1">
					{ slot1 }
				</div>
				<div className="col-span-4 p-1 col-start-1 row-start-1">
					{ slot2 }
				</div>
				<div className="col-span-4 p-1 col-start-1 row-start-2">
					{ slot3 }
				</div>
			</>
		);
	}
	if ( columns === '66/33/2' ) {
		return (
			<>
				<div className="col-span-8 row-span-2 p-1">{ slot1 }</div>
				<div className="col-span-4 p-1">{ slot2 }</div>
				<div className="col-span-4 p-1">{ slot3 }</div>
			</>
		);
	}
	return;
};

const CENTER = { x: 0.5, y: 0.5 };

// How many image slots the chosen layout actually shows.
const slotCount = ( columns ) => {
	const layout = String( columns );
	if ( layout === '1' ) return 1;
	if ( [ '2', '33/66', '66/33' ].includes( layout ) ) return 2;
	return 3;
};

const ImageFocalPoint = ( { label, imageId, value, onChange } ) => {
	const image = useImage( imageId );
	const url =
		image?.media_details?.sizes?.large?.source_url ?? image?.source_url;

	return (
		<div className="mb-4">
			<p className="m-0 mb-2 font-semibold">{ label }</p>
			{ url ? (
				<FocalPointPicker
					url={ url }
					value={ value ?? CENTER }
					onChange={ ( { x, y } ) => onChange( { x, y } ) }
				/>
			) : (
				<Spinner />
			) }
		</div>
	);
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		columns,
		image1,
		image2,
		image3,
		image1FocalPoint,
		image2FocalPoint,
		image3FocalPoint,
	} = attributes;

	// Focal points only for the images that are set and visible in this layout.
	const focalPointImages = [
		{ id: image1, key: 'image1', value: image1FocalPoint },
		{ id: image2, key: 'image2', value: image2FocalPoint },
		{ id: image3, key: 'image3', value: image3FocalPoint },
	]
		.slice( 0, slotCount( columns ) )
		.map( ( image, index ) => ( { ...image, number: index + 1 } ) )
		.filter( ( image ) => image.id );

	if ( ! columns ) {
		return (
			<div { ...useBlockProps() }>
				<h3 className="text-center mb-4">
					Please select the number of columns
				</h3>
				<Grid>
					<GridItem>
						<ColumnButton
							columns={ 1 }
							onClick={ () => setAttributes( { columns: 1 } ) }
						/>
					</GridItem>
					<GridItem>
						<ColumnButton
							columns="33/66"
							label={ __( '33/66' ) }
							onClick={ () =>
								setAttributes( { columns: '33/66' } )
							}
						/>
					</GridItem>
					<GridItem>
						<ColumnButton
							columns={ 2 }
							onClick={ () => setAttributes( { columns: 2 } ) }
						/>
					</GridItem>
					<GridItem>
						<ColumnButton
							columns="66/33"
							label={ __( '66/33' ) }
							onClick={ () =>
								setAttributes( { columns: '66/33' } )
							}
						/>
					</GridItem>
					<GridItem>
						<ColumnButton
							columns="33/66/2"
							label={ __( '33/66, 2 rows' ) }
							onClick={ () =>
								setAttributes( { columns: '33/66/2' } )
							}
						/>
					</GridItem>
					<GridItem>
						<ColumnButton
							columns="66/33/2"
							label={ __( '66/33, 2 rows' ) }
							onClick={ () =>
								setAttributes( { columns: '66/33/2' } )
							}
						/>
					</GridItem>
				</Grid>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<Panel header="Gallery Row Settings">
					<PanelBody>
						<BaseControl label={ __( 'Number of columns' ) }>
							<div className="grid grid-cols-2 gap-2.5">
								<div>
									<ColumnButton
										columns={ 1 }
										onClick={ () =>
											setAttributes( { columns: 1 } )
										}
										size="small"
										selected={ columns === 1 }
									/>
								</div>
								<div>
									<ColumnButton
										columns="33/66"
										label={ __( '33/66' ) }
										onClick={ () =>
											setAttributes( {
												columns: '33/66',
											} )
										}
										size="small"
										selected={ columns === '33/66' }
									/>
								</div>
								<div>
									<ColumnButton
										columns={ 2 }
										onClick={ () =>
											setAttributes( { columns: 2 } )
										}
										size="small"
										selected={ columns === 2 }
									/>
								</div>
								<div>
									<ColumnButton
										columns="66/33"
										label={ __( '66/33' ) }
										onClick={ () =>
											setAttributes( {
												columns: '66/33',
											} )
										}
										size="small"
										selected={ columns === '66/33' }
									/>
								</div>
								<div>
									<ColumnButton
										columns="33/66/2"
										label={ __( '33/66/2' ) }
										onClick={ () =>
											setAttributes( {
												columns: '33/66/2',
											} )
										}
										size="small"
										selected={ columns === '33/66/2' }
									/>
								</div>
								<div>
									<ColumnButton
										columns="66/33/2"
										label={ __( '66/33/2' ) }
										onClick={ () =>
											setAttributes( {
												columns: '66/33/2',
											} )
										}
										size="small"
										selected={ columns === '66/33/2' }
									/>
								</div>
							</div>
						</BaseControl>
					</PanelBody>
					{ focalPointImages.length > 0 && (
						<PanelBody title={ __( 'Image focal points' ) }>
							{ focalPointImages.map( ( image ) => (
								<ImageFocalPoint
									key={ image.key }
									label={ `${ __( 'Image' ) } ${
										image.number
									}` }
									imageId={ image.id }
									value={ image.value }
									onChange={ ( focalPoint ) =>
										setAttributes( {
											[ `${ image.key }FocalPoint` ]:
												focalPoint,
										} )
									}
								/>
							) ) }
						</PanelBody>
					) }
				</Panel>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<div className="tsb-gallery-row grid grid-cols-12 gap-tsb py-4 min-h-100 border border-gray-100">
					<GalleryRow
						columns={ columns }
						slot1={
							<span
								style={ {
									'--tsb-position':
										setFocalPoint( image1FocalPoint ),
								} }
							>
								<MediaSelector
									value={ image1 }
									onSelect={ ( item ) => {
										setAttributes( {
											image1: item.id,
											image1FocalPoint: CENTER,
										} );
									} }
									className="tsb-hero__image"
								/>
							</span>
						}
						slot2={
							<span
								style={ {
									'--tsb-position':
										setFocalPoint( image2FocalPoint ),
								} }
							>
								<MediaSelector
									value={ image2 }
									onSelect={ ( item ) => {
										setAttributes( {
											image2: item.id,
											image2FocalPoint: CENTER,
										} );
									} }
									className="tsb-hero__image"
								/>
							</span>
						}
						slot3={
							<span
								style={ {
									'--tsb-position':
										setFocalPoint( image3FocalPoint ),
								} }
							>
								<MediaSelector
									value={ image3 }
									onSelect={ ( item ) => {
										setAttributes( {
											image3: item.id,
											image3FocalPoint: CENTER,
										} );
									} }
									className="tsb-hero__image"
								/>
							</span>
						}
					/>
				</div>
			</div>
		</>
	);
}
