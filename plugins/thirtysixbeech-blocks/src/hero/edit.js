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
	RichText,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';

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

import { MediaSelector } from '../shared/react/MediaSelector';
import { LinkPopover } from '../shared/react/LinkPopover';
const blockProps = {
	className: 'tsb-hero min-h-100 w-full relative flex items-stretch',
};

export default function Edit( { attributes, setAttributes } ) {
	const { backgroundImage, heading, description, link } = attributes;
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<LinkPopover
						value={ link }
						hasTextControl
						onChange={ ( newLink ) =>
							setAttributes( {
								link: { ...newLink, title: __( 'Read More' ) },
							} )
						}
						onRemove={ () => setAttributes( { link: {} } ) }
					/>
				</ToolbarGroup>
			</BlockControls>
			<header { ...useBlockProps( blockProps ) }>
				<div className="tsb-hero relative z-0 w-full">
					<div className="tsb-hero__image relative z-0">
						<MediaSelector
							value={ backgroundImage }
							onSelect={ ( item ) => {
								setAttributes( {
									backgroundImage: item.id,
								} );
							} }
							className="tsb-hero__image"
						/>
					</div>
					<span className="tsb-hero__overlay absolute z-10 top-0 left-0 w-full h-full"></span>
					<div className="tsb-hero__body  px-5 is-layout-constrained w-full absolute left-0 bottom-0 z-10">
						<div className="py-4 text-white">
							<RichText
								tagName="h2"
								value={ heading }
								placeholder="Hero Heading"
								onChange={ ( newValue ) =>
									setAttributes( { heading: newValue } )
								}
								className="tsb-hero__heading"
								allowedFormats={ [ 'core/italic' ] }
							/>
							<RichText
								value={ description }
								placeholder="Hero description"
								onChange={ ( newValue ) =>
									setAttributes( { description: newValue } )
								}
								className="tsb-hero__description"
								allowedFormats={ [
									'core/bold',
									'core/italic',
								] }
							/>
							<div className="wp-block-button is-style-link">
								<RichText
									tagName="span"
									value={ link?.title }
									placeholder="Read More"
									onChange={ ( newValue ) =>
										setAttributes( {
											link: { ...link, title: newValue },
										} )
									}
									className="wp-block-button__link"
									allowedFormats={ [] }
								/>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
