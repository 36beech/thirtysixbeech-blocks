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
import { useBlockProps, InnerBlocks, PlainText } from '@wordpress/block-editor';
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
						<PlainText
							className="tsb-card__eyebrow"
							value={ overline }
							placeholder={ __( 'Overline Text' ) }
							tagName="div"
						/>
						<PlainText
							className="tsb-card__heading"
							value={ title }
							placeholder={ __( 'Title Text' ) }
							tagName="h3"
						/>
						<PlainText
							className="tsb-card__description"
							value={ description }
							placeholder={ __( 'Description' ) }
							tagName="p"
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

/*
  <div class="tsb-card">
    <div class="tsb-card__image">
      <?php if (!empty($card['image'])): ?>
        <img src="<?php echo $card['image']; ?>" />
      <?php endif; ?>
    </div>
    <div class="tsb-card__body">
      <?php if (!empty($card["eyebrow"])): ?>
        <div class="tsb-card__eyebrow"><?php echo $card["eyebrow"]; ?></div>
      <?php endif; ?>
      <?php if (!empty($card['title'])): ?>
        <h3 class="tsb-card__heading"><?php echo $card['title']; ?></h3>
      <?php endif; ?>
      <?php if (!empty($card['description'])): ?>
        <p class="tsb-card__description"><?php echo nl2br($card['description']); ?></p>
      <?php endif; ?>
    </div>
    <?php if (!empty($card['link'])): ?>
      <a class="tsb-card__link" href="<?php echo $card['link']; ?>">Learn More</a>
    <?php endif; ?>
  </div>
	*/
