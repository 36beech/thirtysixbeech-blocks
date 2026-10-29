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
	InnerBlocks,
	useBlockProps,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { PanelBody, Button } from '@wordpress/components';
import { chevronUp, chevronDown } from '@wordpress/icons';
import type { Block } from '@wordpress/blocks';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

// Defined once at module scope rather than inline in the JSX below: passing
// InnerBlocks a fresh array reference on every render makes it think the
// allowed-blocks configuration changed and re-synchronize its contents
// against it, which — with no `template` to fall back to — clears out
// whatever's already inside. This block's Edit() re-renders on selection
// changes anywhere in the editor (e.g. clicking into a child Social Link's
// URL field), not just its own attribute changes, so this bites often.
const ALLOWED_BLOCKS = [ 'thirtysixbeech-blocks/social-link' ];

interface EditProps {
	clientId: string;
}

/**
 * A short label for a Social Link child in the reorder list: its domain if
 * it has a link set yet, otherwise a fallback based on position.
 */
function getLinkLabel( block: Block, index: number ): string {
	// `Block`'s attributes are generically `Record<string, unknown>` — this
	// child is always a "social-link" block, whose `link` attribute we know
	// the shape of (see social-link/models/attributes.ts).
	const attributes = block.attributes as { link?: { url?: string } };
	const url = attributes.link?.url;
	if ( ! url ) return `${ __( 'Link' ) } ${ index + 1 }`;

	try {
		return new URL( url ).hostname;
	} catch {
		return `${ __( 'Link' ) } ${ index + 1 }`;
	}
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { clientId }: EditProps ) {
	const childBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlocks( clientId ) as Block[],
		[ clientId ]
	);
	const { moveBlocksUp, moveBlocksDown } = useDispatch( blockEditorStore );

	return (
		<>
			<InspectorControls group="list">
				<PanelBody title={ __( 'Reorder Links' ) }>
					{ childBlocks.length === 0 ? (
						<p>
							{ __(
								'Add a Social Link block to reorder it here.'
							) }
						</p>
					) : (
						<ol className="tsb-social-links-reorder">
							{ childBlocks.map( ( block, index ) => (
								<li
									key={ block.clientId }
									className="flex items-center justify-between gap-2 py-1"
								>
									<span>
										{ getLinkLabel( block, index ) }
									</span>
									<span className="flex gap-1">
										<Button
											icon={ chevronUp }
											label={ __( 'Move up' ) }
											disabled={ index === 0 }
											onClick={ () =>
												moveBlocksUp(
													[ block.clientId ],
													clientId
												)
											}
										/>
										<Button
											icon={ chevronDown }
											label={ __( 'Move down' ) }
											disabled={
												index === childBlocks.length - 1
											}
											onClick={ () =>
												moveBlocksDown(
													[ block.clientId ],
													clientId
												)
											}
										/>
									</span>
								</li>
							) ) }
						</ol>
					) }
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<ul className="tsb-inner-blocks flex gap-3">
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
				</ul>
			</div>
		</>
	);
}
