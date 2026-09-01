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
import { useSelect } from '@wordpress/data';
import {
	Panel,
	PanelBody,
	BaseControl,
	SelectControl,
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
import { CardGroup } from '../shared/react/CardGroup';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { columns, postType } = attributes;

	const postTypes = useSelect(
		( select ) => select( 'core' ).getPostTypes( { per_page: -1 } ),
		[]
	);

	const postTypeOptions = [
		{ label: __( 'Select a post type' ), value: '' },
		...( postTypes ?? [] )
			.filter( ( type ) => type.viewable )
			.map( ( type ) => ( { label: type.name, value: type.slug } ) ),
	];

	const posts = useSelect(
		( select ) => {
			if ( ! postType ) {
				return null;
			}
			return select( 'core' ).getEntityRecords( 'postType', postType, {
				status: 'publish',
				per_page: 2,
			} );
		},
		[ postType ]
	);

	if ( ! columns ) {
		return (
			<div { ...useBlockProps() }>
				<h3 className="text-center mb-4">
					Please select the number of columns
				</h3>
				<Grid>
					<GridItem>
						<ColumnButton
							columns={ 2 }
							onClick={ () => setAttributes( { columns: 2 } ) }
						/>
					</GridItem>
					<GridItem>
						<ColumnButton
							columns={ 3 }
							onClick={ () => setAttributes( { columns: 3 } ) }
						/>
					</GridItem>
					<GridItem>
						<ColumnButton
							columns={ 4 }
							onClick={ () => setAttributes( { columns: 4 } ) }
						/>
					</GridItem>
					<GridItem>
						<ColumnButton
							columns="flex"
							label={ __( 'Flex Count' ) }
							onClick={ () =>
								setAttributes( { columns: 'flex' } )
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
				<Panel header="Card Group Settings">
					<PanelBody>
						<SelectControl
							label={ __( 'Post Type' ) }
							value={ postType ?? '' }
							options={ postTypeOptions }
							onChange={ ( value ) =>
								setAttributes( { postType: value } )
							}
						/>
						<BaseControl label={ __( 'Number of columns' ) }>
							<div className="grid grid-cols-2 gap-2.5">
								<div>
									<ColumnButton
										columns={ 2 }
										onClick={ () =>
											setAttributes( { columns: 2 } )
										}
										size="small"
									/>
								</div>
								<div>
									<ColumnButton
										columns={ 3 }
										onClick={ () =>
											setAttributes( { columns: 3 } )
										}
										size="small"
									/>
								</div>
								<div>
									<ColumnButton
										columns={ 4 }
										onClick={ () =>
											setAttributes( { columns: 4 } )
										}
										size="small"
									/>
								</div>
								<div>
									<ColumnButton
										columns="flex"
										label={ __( 'Flex Count' ) }
										onClick={ () =>
											setAttributes( { columns: 'flex' } )
										}
										size="small"
									/>
								</div>
							</div>
						</BaseControl>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ postType ? (
					<CardGroup columns={ columns }>Hello</CardGroup>
				) : (
					<>
						<h3 className="text-center">
							Please select a post type
						</h3>
						<SelectControl
							label={ __( 'Post Type' ) }
							value={ postType ?? '' }
							options={ postTypeOptions }
							onChange={ ( value ) =>
								setAttributes( { postType: value } )
							}
						/>
					</>
				) }
			</div>
		</>
	);
}
