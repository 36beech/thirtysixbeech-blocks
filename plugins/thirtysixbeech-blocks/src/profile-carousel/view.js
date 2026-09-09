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
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay, Controller } from 'swiper/modules';

const blocks = document.querySelectorAll(
	'.wp-block-thirtysixbeech-blocks-profile-carousel'
);

blocks.forEach( ( block ) => {
	const imagesEl = block.querySelector( '.tsb-profile-carousel__images' );
	const bodyEl = block.querySelector( '.tsb-profile-carousel__body' );
	const prevEl = block.querySelector( '.tsb-profile-carousel__prev' );
	const nextEl = block.querySelector( '.tsb-profile-carousel__next' );
	const paginationEl = block.querySelector(
		'.tsb-profile-carousel__pagination'
	);

	if ( ! imagesEl || ! bodyEl ) {
		return;
	}

	const imagesSwiper = new Swiper( imagesEl, {
		modules: [ Controller, Pagination, Navigation, Autoplay ],
		loop: true,
		navigation: {
			prevEl,
			nextEl,
		},
		pagination: {
			el: paginationEl,
			clickable: true,
		},
	} );

	const bodySwiper = new Swiper( bodyEl, {
		modules: [ Controller, Pagination, Autoplay ],
		loop: true,
	} );

	imagesSwiper.controller.control = bodySwiper;
	bodySwiper.controller.control = imagesSwiper;
} );
