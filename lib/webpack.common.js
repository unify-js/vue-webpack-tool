const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

const loaderConfig = require("./loader-configs");

module.exports = {
  entry: "./src/main",

  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
  },

  resolve: {
    // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
    extensions: [".ts", ".js", ".tsx", ".json", ".wasm"],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new HTMLWebpackPlugin({
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      ...loaderConfig,
    ],
  },
  // https://webpack.js.org/guides/caching/
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
