import Swiper from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

const carousels = document.querySelectorAll(
	".wp-block-thirtysixbeech-blocks-carousel",
);
carousels.forEach((carousel) => {
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
