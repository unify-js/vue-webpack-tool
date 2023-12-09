const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new HTMLWebpackPlugin({
      title: "Vue.js",
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
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
};
