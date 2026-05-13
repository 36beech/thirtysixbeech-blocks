import Swiper from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

(() => {
	const homepageCarousels = document.querySelectorAll(
		".wp-block-thirtysixbeech-blocks-hero-carousel",
	);
	homepageCarousels.forEach((homepageCarousel) => {
		const carousel = homepageCarousel.querySelector(
			".homepage-carousel__text-slides",
		);

		const { carouselSettings } = carousel.dataset;
		const carouselSettingsParsed = carouselSettings
			? JSON.parse(carouselSettings)
			: {};

		const swiper = new Swiper(carousel, {
			modules: [Pagination, Autoplay],
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			...carouselSettingsParsed,
		});
	});
})();
