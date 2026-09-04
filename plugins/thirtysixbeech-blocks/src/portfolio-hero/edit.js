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
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
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

import { Hero } from '../shared/react/Hero';
import { useImage } from '../shared/react/useImage';

export default function Edit() {
	const featuredImageId = useSelect(
		( select ) => select( 'core/editor' ).getEditedPostAttribute( 'featured_media' ),
		[]
	);
	const featuredImage = useImage( featuredImageId );
	const featuredImageUrl =
		featuredImage?.media_details?.sizes?.large?.source_url || featuredImage?.source_url;

	return (
		<header { ...useBlockProps() }>
			<Hero
				renderImage={
					featuredImageUrl ? (
						<img
							src={ featuredImageUrl }
							alt=""
							className="w-full h-full object-cover"
						/>
					) : (
						<p>{ __( 'Set a featured image for this post', 'thirtysixbeech-blocks' ) }</p>
					)
				}
				renderTitle={ <InnerBlocks /> }
			/>
		</header>
	);
}
