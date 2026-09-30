import type { Link } from '@shared/react/LinkPopover';

/**
 * Attributes for the "Social Link" block.
 * Keep this in sync with the `attributes` defined in block.json.
 */
export interface Attributes {
	link: Link;
	// Needed so this satisfies @wordpress/blocks' `registerBlockType<Attributes>`
	// generic constraint (Attributes extends Record<string, unknown>).
	[key: string]: unknown;
}
