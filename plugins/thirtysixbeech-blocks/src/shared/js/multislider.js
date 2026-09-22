import Swiper from 'swiper';
import {
	Pagination,
	Navigation,
	Autoplay,
	Controller,
	EffectFade,
} from 'swiper/modules';

export const multislider = () => {
	const blocks = document.querySelectorAll( '.tsb-multislider' );

	blocks.forEach( ( block ) => {
		const imagesEl = block.querySelector( '.__images' );
		const bodyEl = block.querySelector( '.__body' );
		const prevEl = block.querySelector( '.__prev' ) ?? null;
		const nextEl = block.querySelector( '.__next' ) ?? null;
		const paginationEl = block.querySelector( '.__pagination' );

		const options = JSON.parse( block.dataset.sliderOptions ?? '{}' );
		const { effect = 'slide', autoplay = false } = options ?? {};

		if ( ! imagesEl || ! bodyEl ) {
			return;
		}

		const fadeEffect = { crossFade: true };

		const imagesSwiper = new Swiper( imagesEl, {
			modules: [
				Controller,
				Pagination,
				Navigation,
				Autoplay,
				EffectFade,
			],
			loop: true,
			effect,
			fadeEffect,
			navigation: {
				prevEl,
				nextEl,
			},
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay,
		} );

		const bodySwiper = new Swiper( bodyEl, {
			modules: [ Controller, Pagination, Autoplay, EffectFade ],
			loop: true,
			effect,
			fadeEffect,
		} );

		imagesSwiper.controller.control = bodySwiper;
		bodySwiper.controller.control = imagesSwiper;
	} );
};
