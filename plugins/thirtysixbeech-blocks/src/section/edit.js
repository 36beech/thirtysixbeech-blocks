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
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarDropdownMenu,
	PanelBody,
	ToggleControl,
} from '@wordpress/components';
import { useMemo } from 'react';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
import { Section } from '@shared/react/Section';
import { MediaSelector } from '@shared/react';
import { useImage } from '@shared/react/useImage';

export default function Edit( { attributes, setAttributes } ) {
	const {
		semanticTag,
		hasPartialBackground,
		partialBackgroundColor,
		partialBackgroundCoverage,
		backgroundImage,
		fullBrowser,
	} = attributes;

	const image = useImage( backgroundImage );
	const imageUrl =
		image?.media_details?.sizes?.medium_large?.source_url ?? null;

	const TAGS = [
		{
			key: 'section',
			icon: '<section />',
			label: __( 'Section', 'thitysixbeech-blocks' ),
		},
		{
			key: 'header',
			icon: '<header />',
			label: __( 'Header', 'thirtysixbeech-blocks' ),
		},
		{
			key: 'footer',
			icon: '<footer />',
			label: __( 'Footer', 'thirtysixbeech-blocks' ),
		},
		{
			key: 'article',
			icon: '<article />',
			label: __( 'Article', 'thirtysixbeech-blocks' ),
		},
		{
			key: 'div',
			icon: '<div />',
			label: __( 'Div', 'thirtysixbeech-blocks' ),
		},
	];

	const options = useMemo(
		() =>
			TAGS.map( ( { key, icon, label } ) => ( {
				icon: (
					<div style={ { width: '96px', textAlign: 'center' } }>
						<code>{ icon }</code>
					</div>
				),
				title: label,
				onClick: () => setAttributes( { semanticTag: key } ),
				isActive: semanticTag === key,
			} ) ),
		[]
	);

	const SelectedIcon = ( { tag } ) => {
		const match = TAGS.find( ( t ) => t.key === tag ) || TAGS[ 0 ];
		return <code>{ tag }</code>;
	};

	const blockClass = fullBrowser
		? 'w-screen left-1/2 -translate-x-1/2'
		: null;

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody title={ __( 'Background' ) }>
					<MediaSelector
						value={ backgroundImage }
						onSelect={ ( item ) => {
							setAttributes( {
								backgroundImage: item.id,
							} );
						} }
						onRemove={ () =>
							setAttributes( { backgroundImage: null } )
						}
						className="min-h-48"
					/>
					<ToggleControl
						label={ __( 'Full Browser width' ) }
						help={ __(
							`Stretches this ${ semanticTag } to the full width of the browser, even when it's nested inside a constrained layout.`
						) }
						checked={ fullBrowser }
						onChange={ () => {
							setAttributes( { fullBrowser: ! fullBrowser } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarDropdownMenu
						icon={ <SelectedIcon tag={ semanticTag } /> }
						label={ __( 'HTML tag', 'thirtysixbeech-blocks' ) }
						text={ ( semanticTag || 'section' ).toLowerCase() }
						controls={ options }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div { ...useBlockProps( { className: blockClass } ) }>
				{ imageUrl && (
					<div className="tsb-section__background absolute top-0 left-0 z-0 w-full h-full">
						<img
							src={ imageUrl }
							className="w-full h-full object-cover relative z-0"
						/>
						<span className="tsb-section__background-overlay w-full h-full absolute top-0 left-0"></span>
					</div>
				) }
				<Section
					tag={ semanticTag }
					className={ `tsb-section${
						imageUrl ? ' has-background' : ''
					} relative z-10` }
				>
					<div className="tsb-inner-blocks">
						<InnerBlocks />
					</div>
				</Section>
				{ hasPartialBackground && (
					<div
						className="absolute bottom-0 left-0 w-full"
						style={ {
							height: `${ partialBackgroundCoverage }%`,
							background: partialBackgroundColor,
						} }
					></div>
				) }
			</div>
		</>
	);
}
