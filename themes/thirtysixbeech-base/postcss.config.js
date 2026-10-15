module.exports = {
	plugins: [
		require("postcss-pxtorem")({
			rootValue: 16, // matches the browser default <html> font-size
			unitPrecision: 5,
			propList: ["*"],
			mediaQuery: false, // leave px in @media queries (rem there is fragile if the user changes their browser's default font size)
			minPixelValue: 0,
		}),
		// Merges scattered @media rules with matching conditions into one
		// block, and sorts blocks mobile-first: min-width ascending,
		// max-width descending — so the cascade behaves correctly when
		// queries overlap, instead of landing in source order.
		require("postcss-sort-media-queries")({
			sort: "mobile-first",
		}),
	],
};
