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
import { dateI18n } from '@wordpress/date';
import { getRestBase, getRestRoot } from './utils/utils';
import { parseHTML } from '@shared/js/utils';
import { QueryArgs, PostCard, CardOptions } from './utils/types';

const card = ( card: PostCard, options: CardOptions ) => {
	const date = dateI18n( options.dateFormat, card.date );

	const authorName = card._embedded?.author?.[ 0 ]?.name ?? '';
	const media = card._embedded?.[ 'wp:featuredmedia' ]?.[ 0 ];
	const imageUrl =
		media?.media_details?.sizes?.large?.source_url ?? media?.source_url;

	return `
  <div class="tsb-card">
    <div class="tsb-card__image">
      ${
			imageUrl
				? `<img src="${ imageUrl }" class="block h-full w-full object-cover object-center">`
				: ''
		}
    </div>
    <div class="tsb-card__body">
      <div class="tsb-card__eyebrow">${ options.datePrefix } ${ date }${
			authorName ? ` by ${ authorName }` : ''
		}</div>
        <h3 class="tsb-card__heading">${ card?.title?.rendered }</h3>
      </div>
    <a class="tsb-card__link" href="${ card?.link }">Learn More</a>
  </div>`;
};

/**
 * Fetches the next batch of posts: `posts_per_page` posts starting after the
 * `queryArgs.offset` posts that have already been shown.
 */
const getMorePosts = async (
	queryArgs: QueryArgs
): Promise< { posts: PostCard[]; total: number } > => {
	const { post_type = 'post', posts_per_page = 10, offset = 0 } = queryArgs;

	const restBase = await getRestBase( post_type );
	const params = new URLSearchParams( {
		per_page: String( posts_per_page ),
		offset: String( offset ),
		_embed: 'author,wp:featuredmedia',
	} );

	const response = await fetch(
		`${ getRestRoot() }wp/v2/${ restBase }?${ params }`
	);
	if ( ! response.ok ) {
		throw new Error( `Request failed: ${ response.status }` );
	}

	return {
		posts: ( await response.json() ) as PostCard[],
		total: Number( response.headers.get( 'X-WP-Total' ) ),
	};
};

const postListingViewMore = (): void => {
	/**
	 * Get the Post Listing Cards block
	 */
	const postListing: HTMLElement | null = document.querySelector(
		'.wp-block-thirtysixbeech-blocks-post-listing-cards'
	);
	if ( ! postListing ) return;

	/**
	 * Get the View More button, exit if there is no View More button
	 */
	const viewMore = postListing.querySelector(
		'.tsb-view-more .wp-element-button'
	);
	if ( ! viewMore ) return;

	const spinner = postListing.querySelector( '.tsb-spinner' );

	/**
	 *  Get the Card Group and its date
	 */
	const cardGroup: HTMLElement | null =
		postListing.querySelector( '.tsb-card-group' );
	if ( ! cardGroup ) return;

	const queryArgsJSON = postListing?.dataset?.query;
	if ( ! queryArgsJSON ) return;

	const queryArgs: QueryArgs = JSON.parse( queryArgsJSON );
	const options = postListing?.dataset?.options
		? JSON.parse( postListing.dataset.options )
		: null;

	/**
	 * Add Click event to View More button
	 */
	let loading = false;

	viewMore.addEventListener( 'click', async ( event ) => {
		event.preventDefault();
		if ( loading ) return;
		loading = true;

		viewMore.classList.add( 'hidden' );
		spinner?.classList.remove( 'hidden' );

		try {
			const { posts, total } = await getMorePosts( queryArgs );
			console.log( posts );

			posts.forEach( ( post ) => {
				const postCard = parseHTML( card( post, options ) );
				if ( postCard ) cardGroup.appendChild( postCard );
			} );

			// Next click starts after the posts just fetched.
			queryArgs.offset = ( queryArgs.offset ?? 0 ) + posts.length;

			// Nothing left to load: remove the View More button.
			if ( ! posts.length || queryArgs.offset >= total ) {
				viewMore.closest( '.tsb-view-more' )?.remove();
			}
		} catch ( error ) {
			console.error( error );
		} finally {
			loading = false;
			viewMore.classList.remove( 'hidden' );
			spinner?.classList.add( 'hidden' );
		}
	} );
};

postListingViewMore();
