/**
 * Attributes for the "Post Navigation" block.
 * Keep this in sync with the `attributes` defined in block.json.
 */
export interface Attributes {
	viewAll: string;
	prevPrefix: string;
	prevSuffix: string;
	nextPrefix: string;
	nextSuffix: string;
	// Needed so this satisfies @wordpress/blocks' `registerBlockType<Attributes>`
	// generic constraint (Attributes extends Record<string, unknown>).
	[key: string]: unknown;
}
