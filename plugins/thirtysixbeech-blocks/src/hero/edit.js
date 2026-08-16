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
import { useBlockProps, RichText } from '@wordpress/block-editor';

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
const blockProps = {
	className: "tsb-hero min-h-100 relative flex items-stretch"
};

export default function Edit( { attributes, setAttributes } ) {
	const { backgroundImage, heading, description } = attributes;
	return (
		<header { ...useBlockProps(blockProps) }>
			<MediaSelector 
				value={backgroundImage} 
				onSelect={(item) => {
					setAttributes({
						backgroundImage: item.id,
					});
				}}
				className="tsb-hero__image"
			/>
			<div className='is-layout-constrained w-full absolute left-0 bottom-0 z-10'>
				<div>
					<RichText
						tagName='h1'
						value={heading}
						placeholder='Hero Heading'
						onChange={(newValue) => setAttributes( { heading: newValue } ) }
						className="tsb-hero__heading"
					/>
					<RichText
						value={description}
						placeholder='Hero description'
						onChange={(newValue) => setAttributes( { description: newValue } ) }
						className="tsb-hero__description"
					/>
				</div>
			</div>
		</header>
	);
}
