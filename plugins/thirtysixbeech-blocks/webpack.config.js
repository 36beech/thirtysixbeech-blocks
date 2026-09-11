const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const { execSync } = require("child_process");
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Running `postcss --watch` as its own sibling process alongside
// `wp-scripts start` (webpack --watch) never completes a single compile —
// on this setup, having webpack's own watcher and an independent chokidar
// watcher both active at once reliably leaves the second one stuck, with
// no error, no output, nothing written. Rather than run postcss as a
// separate watcher, trigger it from webpack's own compile lifecycle so
// there's only ever one watcher driving the whole build.
class BuildGlobalCssPlugin {
  apply(compiler) {
    const cssEntryPoints = [
      path.resolve(__dirname, "src/style.css"),
      path.resolve(__dirname, "src/editor.css"),
    ];

    // Neither file is imported by any JS entry, so they aren't part of
    // webpack's own module graph — without this, editing either one
    // would never trigger a rebuild/afterEmit at all in watch mode.
    compiler.hooks.afterCompile.tap("BuildGlobalCssPlugin", (compilation) => {
      cssEntryPoints.forEach((file) => compilation.fileDependencies.add(file));
    });

    compiler.hooks.afterEmit.tap("BuildGlobalCssPlugin", () => {
      try {
        execSync(
          "npx postcss src/style.css -o build/assets/css/main.css && npx postcss src/editor.css -o build/assets/css/editor.css",
          { cwd: __dirname, stdio: "inherit" }
        );
      } catch (error) {
        console.error("[BuildGlobalCssPlugin] postcss build failed:", error.message);
      }
    });
  }
}

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
    new BuildGlobalCssPlugin(),
    // @wordpress/scripts only copies render.php/variations.php files that a
    // block.json references — it has no notion of any other PHP those files
    // require(), whether that's shared/includes or a block's own includes/
    // folder (e.g. post-listing-cards/includes/util.php). Mirror every
    // src/**/includes folder to the same path under build/ so those
    // `require __DIR__ . "/includes/..."` / `.../shared/includes/...` calls
    // resolve at runtime instead of 404ing on a missing file.
    new CopyWebpackPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, "src"),
          from: "*/includes/**/*.php",
          to: path.resolve(__dirname, "build"),
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
