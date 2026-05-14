const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin").default;

module.exports = {
  ...defaultConfig,
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      ...defaultConfig.resolve?.alias,
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
  plugins: [
    ...defaultConfig.plugins,
    new SVGSpritemapPlugin(path.resolve(__dirname, "src/shared/icons/**/*.svg"), {
      output: {
        filename: "sprite.svg", // Will be in build/ folder
        svgo: true,
      },
      sprite: {
        prefix: "icon-",
        generate: {
          title: false, // No <title> tags in symbols
        },
      },
    }),
  ],
};
