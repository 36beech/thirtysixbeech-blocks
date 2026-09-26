/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
import { format, dateI18n } from '@wordpress/date';
interface QueryArgs {
	post_type?: string;
	posts_per_page?: number;
	offset?: number;
}

interface PostCard {
	link: string;
	title: {
		rendered: string;
	};
	date: string;
	author: string;
}

interface CardOptions {
	datePrefix: string;
	dateFormat: string;
}

const restBaseCache: Record< string, string > = {};

const card = ( card: PostCard, options: CardOptions ) => {
	const date = dateI18n( options.dateFormat, card.date );
	return `
  <div class="tsb-card">
    <div class="tsb-card__image">
      <img src="http://localhost:10058/wp-content/uploads/2026/09/high_end_interior_1014x856.png" class="block h-full w-full object-cover object-center">
    </div>
    <div class="tsb-card__body">
      <div class="tsb-card__eyebrow">${ options.datePrefix } ${ date } by ${ card.author }</div>
        <h3 class="tsb-card__heading">${ card?.title?.rendered }</h3>
      </div>
    <a class="tsb-card__link" href="${ card?.link }">Learn More</a>
  </div>`;
};

/**
 * REST API root, e.g. "http://site.com/wp-json/". Falls back to /wp-json/.
 */
const getRestRoot = (): string =>
	document.querySelector< HTMLLinkElement >(
		'link[rel="https://api.w.org/"]'
	)?.href ?? '/wp-json/';

/**
 * A post type's endpoint isn't always its name ("post" is "posts"), so look
 * up its rest_base instead of guessing.
 */
const getRestBase = async ( postType: string ): Promise< string > => {
	if ( restBaseCache[ postType ] ) return restBaseCache[ postType ];

	const response = await fetch(
		`${ getRestRoot() }wp/v2/types/${ encodeURIComponent( postType ) }`
	);
	if ( ! response.ok ) {
		throw new Error( `Unknown post type "${ postType }"` );
	}

	const type: { rest_base: string } = await response.json();
	restBaseCache[ postType ] = type.rest_base;
	return type.rest_base;
};

/**
 * Fetches the next batch of posts: `posts_per_page` posts starting after the
 * `queryArgs.offset` posts that have already been shown.
 */
const getMorePosts = async ( queryArgs: QueryArgs ) => {
	const { post_type = 'post', posts_per_page = 10, offset = 0 } = queryArgs;

	const restBase = await getRestBase( post_type );
	const params = new URLSearchParams( {
		per_page: String( posts_per_page ),
		offset: String( offset ),
	} );

	const response = await fetch(
		`${ getRestRoot() }wp/v2/${ restBase }?${ params }`
	);
	if ( ! response.ok ) {
		throw new Error( `Request failed: ${ response.status }` );
	}

	return response.json();
};

const postListingViewMore = (): void => {
	const postListing: HTMLElement | null = document.querySelector(
		'.wp-block-thirtysixbeech-blocks-post-listing-cards'
	);
	if ( ! postListing ) return;

	const viewMore = postListing.querySelector(
		'.tsb-view-more .wp-element-button'
	);
	if ( ! viewMore ) return;

	const cardGroup: HTMLElement | null =
		postListing.querySelector( '.tsb-card-group' );
	if ( ! cardGroup ) return;

	const queryArgsJSON = postListing?.dataset?.query;
	if ( ! queryArgsJSON ) return;

	const queryArgs: QueryArgs = JSON.parse( queryArgsJSON );
	const options = postListing?.dataset?.options
		? JSON.parse( postListing.dataset.options )
		: null;

	let loading = false;

	viewMore.addEventListener( 'click', async ( event ) => {
		event.preventDefault();
		if ( loading ) return;
		loading = true;

		try {
			const posts = await getMorePosts( queryArgs );
			console.log( posts );

			// Next click starts after the posts just fetched.
			queryArgs.offset = ( queryArgs.offset ?? 0 ) + posts.length;
		} catch ( error ) {
			console.error( error );
		} finally {
			loading = false;
		}
	} );
};

postListingViewMore();
