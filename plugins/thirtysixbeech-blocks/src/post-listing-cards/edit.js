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
import { useSelect } from '@wordpress/data';
import {
	Panel,
	PanelBody,
	SelectControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { InputControl, Stack } from '@wordpress/ui';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { ColumnButtons } from '../shared/react/ColumnButton';
import { Card, CardGroup } from '../shared/react/Card';
import { useEffect, useState } from 'react';
import { CheckboxGroup } from '../shared/react/CheckboxGroup';
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

export const roundToNearestFactor = ( x, y ) => {
	if ( x <= y ) return y;
	return Math.round( x / y ) * y;
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		columns,
		postType,
		postsPerPage,
		pagination,
		show,
		datePrefix,
		dateFormat,
	} = attributes;
	const [ selectedShowOptions, setSelectedShowOptions ] = useState( [] );

	const postTypes = useSelect(
		( select ) => select( 'core' ).getPostTypes( { per_page: -1 } ),
		[]
	);

	const postTypeOptions = [
		{ label: __( 'Current Query' ), value: '' },
		...( postTypes ?? [] )
			.filter( ( type ) => type.viewable )
			.map( ( type ) => ( { label: type.name, value: type.slug } ) ),
	];

	const postTypeHelp = __(
		'By default, this shows posts from the query already running on this page. Select a specific post type to override that and pull from a different source instead.'
	);

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

	const columnCount = typeof columns === 'number' ? columns : 4;

	useEffect( () => {
		setAttributes( {
			postsPerPage: roundToNearestFactor( postsPerPage, columnCount ),
		} );
	}, [ columns ] );

	useEffect( () => {
		const showOptions = [
			{ label: 'Date', value: 'date' },
			{ label: 'Author', value: 'author' },
			{ label: 'Title', value: 'title' },
			{ label: 'Excerpt', value: 'excerpt' },
			{ label: 'Read More', value: 'readmore' },
			{ label: 'Featured Image', value: 'image' },
		];

		const selected = showOptions.map( ( option ) => {
			return {
				...option,
				checked: show?.includes( option.value ) ?? false,
			};
		} );

		setSelectedShowOptions( selected );
	}, [ show ] );

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

	const handleSelectCardOptions = ( value, checked ) => {
		const newValue = checked
			? [ ...new Set( [ ...show, value ] ) ]
			: show.filter( ( v ) => v !== value );
		setAttributes( { show: newValue } );
	};

	return (
		<>
			<InspectorControls>
				<Panel header="Card Group Settings">
					<PanelBody
						title={ __( 'Card Group Settings' ) }
						initialOpen={ true }
					>
						<Stack direction="column" gap="lg">
							<SelectControl
								label={ __( 'Post Type' ) }
								help={ postTypeHelp }
								value={ postType ?? '' }
								options={ postTypeOptions }
								onChange={ ( value ) =>
									setAttributes( { postType: value } )
								}
							/>
							<ColumnButtons
								options={ columnOptions }
								selected={ columns }
								onSelect={ ( value ) =>
									setAttributes( { columns: value } )
								}
							/>
							<InputControl
								label={ __( 'Posts per page' ) }
								value={ postsPerPage }
								type="number"
								step={ columnCount }
								onValueChange={ ( value ) => {
									setAttributes( { postsPerPage: value } );
								} }
							/>
							<ToggleGroupControl
								value={ pagination }
								label={ __( 'Pagination Style' ) }
								help={ __(
									'Choose how visitors move through additional posts — numbered pagination, or a button that loads more via AJAX.'
								) }
								onChange={ ( value ) =>
									setAttributes( { pagination: value } )
								}
								isBlock
							>
								<ToggleGroupControlOption
									label="Pagination"
									value={ true }
								/>
								<ToggleGroupControlOption
									label="Load More"
									value={ false }
								/>
							</ToggleGroupControl>
						</Stack>
					</PanelBody>
					<PanelBody
						title={ __( 'Card Settings' ) }
						initialOpen={ true }
					>
						<Stack direction="column" gap="lg">
							<CheckboxGroup
								options={ selectedShowOptions }
								label={ __( 'Show in card:' ) }
								onCheck={ handleSelectCardOptions }
							/>
							<InputControl
								label={ __( 'Date Prefix' ) }
								value={ datePrefix }
								onChange={ ( value ) =>
									setAttributes( { datePrefix: value } )
								}
							/>
							<InputControl
								label={ __( 'Date Format' ) }
								value={ dateFormat }
								onChange={ ( value ) =>
									setAttributes( { dateFormat: value } )
								}
							/>
						</Stack>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<p>Query</p>
				{ posts && (
					<CardGroup columns={ columns }>
						{ posts.map( ( post ) => (
							<Card key={ post.id } />
						) ) }
					</CardGroup>
				) }
			</div>
		</>
	);
}
