export interface QueryArgs {
	post_type?: string;
	posts_per_page?: number;
	offset?: number;
}

export interface PostCard {
	link: string;
	title: {
		rendered: string;
	};
	date: string;
	author: number;
	featured_media: number;
	// Present when the request includes `_embed`.
	_embedded?: {
		author?: Array< { name: string } >;
		'wp:featuredmedia'?: Array< {
			source_url: string;
			media_details?: {
				sizes?: Record< string, { source_url: string } >;
			};
		} >;
	};
}

export interface CardOptions {
	datePrefix: string;
	dateFormat: string;
}
