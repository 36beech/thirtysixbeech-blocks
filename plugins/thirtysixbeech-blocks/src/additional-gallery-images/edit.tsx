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
	MediaUploadCheck,
	MediaUpload,
	InspectorControls,
} from '@wordpress/block-editor';
import { Panel, PanelBody } from '@wordpress/components';
import { Button, Icon } from '@wordpress/ui';
import { image } from '@wordpress/icons';
import { useImage } from '@shared/react';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { AdditionalGalleryImagesAttributes } from './models/attributes';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

interface EditProps {
	attributes: AdditionalGalleryImagesAttributes;
	setAttributes: (
		attributes: Partial< AdditionalGalleryImagesAttributes >
	) => void;
}

const ImageThumb = ( { imageId }: { imageId: number } ) => {
	const attachment = useImage( imageId );

	if ( ! attachment ) {
		return <div className="aspect-square bg-black/10" />;
	}

	const url =
		attachment.media_details?.sizes?.thumbnail?.source_url ??
		attachment.source_url;

	return (
		<div className="p-1.25 w-1/24">
			<img
				src={ url }
				alt={ attachment.alt_text ?? '' }
				className="block w-full aspect-square object-cover"
			/>
		</div>
	);
};

export default function Edit( { attributes, setAttributes }: EditProps ) {
	const { images } = attributes;

	const onSelect = ( items: { id: number }[] ) => {
		setAttributes( { images: items.map( ( item ) => item.id ) } );
	};

	return (
		<>
			<InspectorControls>
				<Panel header="Additional Gallery Images">
					<PanelBody>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelect }
								multiple={ true }
								allowedTypes={ [ 'image' ] }
								value={ images }
								gallery={ true }
								render={ ( { open } ) => (
									<Button onClick={ open } className="w-full">
										<Icon icon={ image } />
										{ images.length === 0
											? 'Add'
											: 'Edit' }{ ' ' }
										Images
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<h2 className="text-center">Additional Gallery Images</h2>
				<p className="text-center">
					Add images to the modal carousel when paired with the
					Gallery Row block.
				</p>
				<div className="flex flex-col gap-3 items-center py-3">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelect }
							multiple={ true }
							allowedTypes={ [ 'image' ] }
							value={ images }
							gallery={ true }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									<Icon icon={ image } />
									{ images.length === 0
										? 'Add'
										: 'Edit' }{ ' ' }
									Images
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ images.length > 0 && (
						<div className="flex justify-center -mx-2.5">
							{ images.map( ( imageId ) => (
								<ImageThumb
									key={ imageId }
									imageId={ imageId }
								/>
							) ) }
						</div>
					) }
				</div>
			</div>
		</>
	);
}
