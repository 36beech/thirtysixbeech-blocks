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
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { MediaSelector } from '../shared/react/MediaSelector';
import { useMemo } from 'react';

const NAME_LIST = [
	'James Whitfield',
	'Priya Chandrasekaran',
	'Marcus Delgado',
	'Fiona Callahan',
	'Kwame Osei',
	'Isabelle Fournier',
	'Daniel Novak',
	'Renata Alves',
	'Theo Bramwell',
	'Michaela Sørensen',
];
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit( { attributes, setAttributes } ) {
	const { portrait, name, title } = attributes;

	const placeholderName = useMemo(
		() => NAME_LIST[ Math.floor( Math.random() * NAME_LIST.length ) ],
		[]
	);

	return (
		<article { ...useBlockProps() }>
			<div className="tsb-profile flex gap-18 items-center">
				<div className="tsb-profile__portrait">
					<MediaSelector
						value={ portrait }
						onSelect={ ( item ) =>
							setAttributes( { portrait: item.id } )
						}
						className="tsb-profile__portrait-image"
					/>
				</div>
				<div className="tsb-profile__body">
					<RichText
						tagName="h3"
						className="tsb-profile__name"
						value={ name }
						onChange={ ( name ) => setAttributes( { name } ) }
						placeholder={ placeholderName }
						allowedFormats={ [] }
						disableLineBreaks
					/>
					<RichText
						tagName="div"
						className="tsb-profile__title"
						value={ title }
						onChange={ ( title ) => setAttributes( { title } ) }
						placeholder={ __( 'Title' ) }
						allowedFormats={ [] }
						disableLineBreaks
					/>
					<div className="tsb-inner-blocks">
						<InnerBlocks
							allowedBlocks={ [ 'core/paragraph' ] }
							template={ [ [ 'core/paragraph' ] ] }
						/>
					</div>
				</div>
			</div>
		</article>
	);
}
