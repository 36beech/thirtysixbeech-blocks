const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
    // @wordpress/scripts only copies render.php/variations.php files that a
    // block.json references — it has no notion of shared PHP files that
    // those files themselves require(). Copy src/shared/includes verbatim
    // to build/shared/includes so blocks' `require __DIR__ . "/../shared/includes/..."`
    // resolves at runtime instead of 404ing on a missing file.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/shared/includes"),
          to: path.resolve(__dirname, "build/shared/includes"),
          noErrorOnMissing: true,
        },
      ],
    }),
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
