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
	author: string;
}

export interface CardOptions {
	datePrefix: string;
	dateFormat: string;
}
