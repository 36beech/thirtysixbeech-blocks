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
	<dialog class="w-screen h-screen max-w-none max-h-none fixed top-0 left-0 bg-[rgba(0,0,0,0.8)] p-tsb text-white">
		<div class="w-full h-full flex flex-col gap-tsb">
			<div class="grow tsb-dialog-slider"></div>
			<div class="flex gap-2 my-4 justify-center">
					<div class="wp-block-button is-style-link"><button class="tsb-hero-carousel__prev __prev wp-block-button__link wp-element-button text-white">Prev</button></div>
					<div class="tsb-carousel__navigation tsb-hero-carousel__pagination __pagination swiper-pagination"></div>
					<div class="wp-block-button is-style-link"><button class="tsb-hero-carousel__next __next wp-block-button__link wp-element-button text-white">Next</button></div>
			</div>
		</div>
	</dialog>
`;

const slide = ( imageObj: GalleryImage ) => `<div class="h-full">
	<figure class="h-full flex flex-col">
		<div class="grow">
			<img 
				src="${ imageObj.url }" 
				alt="${ imageObj.alt }" 
				srcset="${ imageObj.srcset }" 
				sizes="${ imageObj.sizes_attr }" 
				class="relative z-0 w-full h-full object-contain" 
				loading="lazy" 
				decoding="async">
		</div>
		${ imageObj ? `<figcaption>${ imageObj.caption }</figcaption>` : '' }
	</figure>
</div>`;

const gallery = () => {
	const galleryRows = Array.from(
		document.querySelectorAll< HTMLElement >( '.tsb-gallery-row' )
	);

	if ( ! galleryRows.length ) return;

	/* Build the dialog */
	const doc = new DOMParser().parseFromString( dialog, 'text/html' );
	const galleryDialog = doc.body
		.firstElementChild as HTMLDialogElement | null;
	if ( ! galleryDialog ) return;

	const sliderContainer = galleryDialog.querySelector( '.tsb-dialog-slider' );

	document.body.appendChild( galleryDialog );

	/* Gather the list of images */
	const imageList: Array< GalleryImage > = galleryRows
		.map( ( row ) => {
			const images: Array< GalleryImage > = JSON.parse(
				row.dataset.images ?? '[]'
			);
			return images;
		} )
		.flat();

	/* Adding click event to page */
	const imageLinks = document.querySelectorAll(
		'.tsb-gallery-row__image-link'
	);

	console.log( imageList );
	imageList.forEach( ( imageObj ) => {
		const doc = new DOMParser().parseFromString(
			slide( imageObj ),
			'text/html'
		);
		const imageSlide = doc.body;
		sliderContainer?.appendChild( imageSlide );
	} );

	imageLinks.forEach( ( link, i ) => {
		link.addEventListener( 'click', ( event ) => {
			event.preventDefault();
			galleryDialog.showModal();
			console.log( i );
		} );
	} );
};
gallery();
