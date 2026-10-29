/**
 * Attributes for the "Publication Card" block.
 * Keep this in sync with the `attributes` defined in block.json.
 */
export interface Attributes {
	title: string;
	backgroundImage: number | null;
	logo: number | null;
	link: {
		url?: string;
		title?: string;
		opensInNewTab?: boolean;
	};
	// Needed so this satisfies @wordpress/blocks' `registerBlockType<Attributes>`
	// generic constraint (Attributes extends Record<string, unknown>).
	[key: string]: unknown;
}
