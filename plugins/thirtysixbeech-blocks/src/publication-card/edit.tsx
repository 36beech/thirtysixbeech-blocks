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
} from '@wordpress/block-editor';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { useImage } from '@shared/react';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { title, backgroundImage, logo, link } = attributes;

	const backgroundImageItem = useImage( backgroundImage );
	const logoItem = useImage( logo );

	const backgroundImageUrl = backgroundImageItem?.source_url ?? null;
	const logoUrl = logoItem?.source_url ?? null;

	return (
		<div { ...useBlockProps() }>
			<div className="tsb-image-publication-card relative z-0 w-full">
				<div className="relative w-full h-full top-0 left-0 z-0 tsb-image-publication-card__image">
					{ backgroundImageUrl && (
						<img
							src={ backgroundImageUrl }
							className="w-full h-full object-fit object-center"
						/>
					) }
				</div>
				<div className="absolute w-full h-full top-0 left-0 z-10 tsb-image-publication-card__overlay"></div>
				<div className="absolute w-full h-full top-0 left-0 z-20 flex flex-col items-stretch justify-center tsb-image-publication-card__logo">
					<div
						className={ `p-5 ${
							logoUrl
								? 'grid grid-cols-1 grid-rows-1'
								: 'aspect-67/17'
						}` }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( item ) => {
									setAttributes( { logo: item.id } );
								} }
								render={ ( { open } ) => (
									<>
										<button
											className="tsb-image-publication-card__upload-logo w-full h-full col-start-1 row-start-1 relative z-10 uppercase font-semibold"
											onClick={ open }
										>
											<span className="bg-[rgba(255,255,255,0.8)] p-2 inline-block border">
												{ logoUrl
													? __( 'Change Logo Image' )
													: __( 'Add Logo Image' ) }
											</span>
										</button>
										{ logoUrl && (
											<img
												src={ logoUrl }
												className="col-start-1 row-start-1 relative z-0"
											/>
										) }
									</>
								) }
							/>
						</MediaUploadCheck>
					</div>
				</div>
			</div>
		</div>
	);
}
