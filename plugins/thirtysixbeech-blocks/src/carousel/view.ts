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
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';

const carousels = document.querySelectorAll< HTMLElement >( '.tsb-carousel' );

carousels.forEach( ( carousel ) => {
	const sliderEl = carousel.querySelector< HTMLElement >(
		'.tsb-carousel__slider'
	);
	if ( ! sliderEl ) return;

	// This block's view script runs once per carousel instance on the page.
	// Skip anything Swiper's already initialized, in case this ever runs
	// twice (see the same guard in shared/js/multislider.js).
	if ( sliderEl.classList.contains( 'swiper-initialized' ) ) return;

	new Swiper( sliderEl, {
		modules: [ Navigation, Pagination, Keyboard, Autoplay ],
		rewind: true,
		keyboard: { enabled: true },
		autoplay: {
			delay: 4000,
			// Keep rotating even after someone clicks Prev/Next, rather than
			// stopping for good the moment they interact once.
			disableOnInteraction: false,
		},
		navigation: {
			prevEl: carousel.querySelector< HTMLElement >(
				'.tsb-carousel__prev'
			),
			nextEl: carousel.querySelector< HTMLElement >(
				'.tsb-carousel__next'
			),
		},
		pagination: {
			el: carousel.querySelector< HTMLElement >(
				'.tsb-carousel__pagination'
			),
			clickable: true,
		},
	} );
} );
