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
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { Button } from '@wordpress/ui';
import { plus } from '@wordpress/icons';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { Card } from '../shared/react/Card';
import { MediaSelector } from '../shared/react/MediaSelector';

const MAX_CTA_BLOCKS = 1;

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { image, overline, title, description } = attributes;
	const { insertBlock } = useDispatch( 'core/block-editor' );
	const ctaCount = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlockOrder( clientId ).length,
		[ clientId ]
	);
	const hasReachedCtaLimit = ctaCount >= MAX_CTA_BLOCKS;

	return (
		<div { ...useBlockProps() }>
			<Card
				image={
					<MediaSelector
						value={ image }
						onSelect={ ( item ) => {
							setAttributes( {
								image: item.id,
							} );
						} }
						className="tsb-hero__image"
					/>
				}
				body={
					<>
						<RichText
							tagName="div"
							className="tsb-card__eyebrow"
							value={ overline }
							onChange={ ( overline ) =>
								setAttributes( { overline } )
							}
							placeholder={ __( 'Overline Text' ) }
							allowedFormats={ [] }
							disableLineBreaks
						/>
						<RichText
							tagName="h3"
							className="tsb-card__heading"
							value={ title }
							onChange={ ( title ) => setAttributes( { title } ) }
							placeholder={ __( 'Title Text' ) }
							allowedFormats={ [] }
							disableLineBreaks
						/>
						<RichText
							tagName="p"
							className="tsb-card__description"
							value={ description }
							onChange={ ( description ) =>
								setAttributes( { description } )
							}
							placeholder={ __( 'Description' ) }
						/>
					</>
				}
				cta={
					<div className="tsb-inner-blocks">
						<InnerBlocks
							allowedBlocks={
								hasReachedCtaLimit ? [] : [ 'core/buttons' ]
							}
							renderAppender={
								hasReachedCtaLimit
									? undefined
									: () => (
											<Button
												variant="outline"
												tone="neutral"
												onClick={ () =>
													insertBlock(
														createBlock(
															'core/buttons',
															{},
															[
																createBlock(
																	'core/button',
																	{
																		className:
																			'is-style-link',
																	}
																),
															]
														),
														0,
														clientId
													)
												}
											>
												<Button.Icon icon={ plus } />
												{ __( 'Add CTA' ) }
											</Button>
									  )
							}
						/>
					</div>
				}
			/>
		</div>
	);
}
