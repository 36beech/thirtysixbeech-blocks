import { DOMElement } from 'react';

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
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

interface GalleryImage {
	alt: string;
	caption: string;
	description: string;
	mime_type: string;
	sizes_attr: string;
	srcset: string;
	title: string;
	url: string;
}

const dialog = `
	<dialog class="w-screen h-screen max-w-none max-h-none fixed top-0 left-0 bg-[rgba(0,0,0,0.9)] p-tsb text-white">
		<div class="wp-block-button is-style-link absolute top-tsb right-tsb z-100"><button class="wp-block-button__link wp-element-button text-white tsb-dialog-close">Close</button></div>
		<div class="w-full h-full flex flex-col gap-tsb">
			<div class="grow min-h-0 w-full swiper tsb-dialog-slider">
				<div class="swiper-wrapper"></div>
			</div>
			<div class="flex gap-2 my-4 justify-center">
				<div class="wp-block-button is-style-link"><button class="tsb-dialog-slider__prev wp-block-button__link wp-element-button text-white">Prev</button></div>
				<div class="tsb-carousel__navigation tsb-dialog-slider__pagination swiper-pagination"></div>
				<div class="wp-block-button is-style-link"><button class="tsb-dialog-slider__next wp-block-button__link wp-element-button text-white">Next</button></div>
			</div>
		</div>
	</dialog>
`;

const esc = ( value = '' ): string =>
	value.replace( /[&<>"']/g, ( c ) => `&#${ c.charCodeAt( 0 ) };` );

const slide = ( imageObj: GalleryImage ) => `<div class="swiper-slide h-full">
	<figure class="h-full flex flex-col">
		<div class="grow min-h-0">
			<img
				src="${ esc( imageObj.url ) }"
				alt="${ esc( imageObj.alt ) }"
				srcset="${ esc( imageObj.srcset ) }"
				sizes="${ esc( imageObj.sizes_attr ) }"
				class="relative z-0 w-full h-full object-contain"
				loading="lazy"
				decoding="async">
		</div>
		${
			imageObj.caption
				? `<figcaption class="w-full max-w-tsb-width m-auto p-tsb-half">${ esc(
						imageObj.caption
				  ) }</figcaption>`
				: ''
		}
	</figure>
</div>`;

const parseHTML = ( html: string ): HTMLElement | null =>
	new DOMParser().parseFromString( html, 'text/html' ).body
		.firstElementChild as HTMLElement | null;

const gallery = () => {
	const galleryRows = Array.from(
		document.querySelectorAll< HTMLElement >( '.tsb-gallery-row' )
	);

	if ( ! galleryRows.length ) return;

	/* Build the dialog */
	const galleryDialog = parseHTML( dialog ) as HTMLDialogElement | null;
	if ( ! galleryDialog ) return;

	const sliderEl =
		galleryDialog.querySelector< HTMLElement >( '.tsb-dialog-slider' );
	const sliderWrapper =
		galleryDialog.querySelector< HTMLElement >( '.swiper-wrapper' );
	if ( ! sliderEl || ! sliderWrapper ) return;

	document.body.appendChild( galleryDialog );

	const closeButton = galleryDialog.querySelector( '.tsb-dialog-close' );
	closeButton?.addEventListener( 'click', ( e ) => {
		e.preventDefault();
		galleryDialog.close();
	} );

	/* Gather the list of images */
	const imageList: Array< GalleryImage > = galleryRows
		.map( ( row ) => {
			const images: Array< GalleryImage > = JSON.parse(
				row.dataset.images ?? '[]'
			);
			return images;
		} )
		.flat();

	imageList.forEach( ( imageObj ) => {
		const imageSlide = parseHTML( slide( imageObj ) );
		if ( imageSlide ) sliderWrapper.appendChild( imageSlide );
	} );

	/*
	 * Swiper can't measure slides while the dialog is closed (display: none),
	 * so it's created the first time the dialog opens.
	 */
	let swiper: Swiper | null = null;

	const openAt = ( index: number ) => {
		galleryDialog.showModal();

		if ( ! swiper ) {
			swiper = new Swiper( sliderEl, {
				modules: [ Navigation, Pagination, Keyboard ],
				rewind: true,
				keyboard: { enabled: true },
				navigation: {
					prevEl: galleryDialog.querySelector< HTMLElement >(
						'.tsb-dialog-slider__prev'
					),
					nextEl: galleryDialog.querySelector< HTMLElement >(
						'.tsb-dialog-slider__next'
					),
				},
				pagination: {
					el: galleryDialog.querySelector< HTMLElement >(
						'.tsb-dialog-slider__pagination'
					),
					clickable: true,
				},
			} );
		} else {
			swiper.update();
		}

		swiper.slideTo( index, 0 );
	};

	/* Adding click event to page */
	document
		.querySelectorAll( '.tsb-gallery-row__image-link' )
		.forEach( ( link, i ) => {
			link.addEventListener( 'click', ( event ) => {
				event.preventDefault();
				openAt( i );
			} );
		} );
};
gallery();
