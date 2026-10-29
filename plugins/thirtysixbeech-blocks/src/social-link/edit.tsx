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
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { LinkPopover } from '@shared/react/LinkPopover';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import type { Attributes } from './models/attributes';
import { getIcon } from './utils';

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
	const { link } = attributes;
	const url = link?.url ?? null;
	const Icon = getIcon( url );
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<LinkPopover
						value={ link }
						onChange={ ( newLink ) =>
							setAttributes( { link: newLink } )
						}
						onRemove={ () => {
							setAttributes( {
								link: { opensInNewTab: true },
							} );
						} }
					/>
				</ToolbarGroup>
			</BlockControls>
			{ Icon ? (
				<li { ...useBlockProps() }>
					<Icon className="tsb-social-link-icon" />
				</li>
			) : (
				<div
					{ ...useBlockProps( {
						className:
							'tsb-social-link-icon bg-black opacity-20 block',
					} ) }
				></div>
			) }
		</>
	);
}
