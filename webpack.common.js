const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

module.exports = {
  entry: "./src/main.js",

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  plugins: [
    new webpack.ProgressPlugin(),
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

      // https://github.com/privatenumber/esbuild-loader-examples/blob/master/examples/vue-loader/webpack.config.js
      {
        test: /\.js$/,
        loader: "esbuild-loader",
        options: {
          loader: "js",
          target: "es2015",
        },
      },

      {
        test: /\.jsx$/,
        loader: "esbuild-loader",
        options: {
          loader: "jsx",
          target: "es2015",
        },
      },

      {
        test: /\.ts$/,
        loader: "esbuild-loader",
        options: {
          loader: "ts",
          target: "es2015",
        },
      },

      {
        test: /\.tsx$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2015",
        },
      },

      {
        test: /\.css$/,
        oneOf: [
          // this matches `<style module>`
          {
            resourceQuery: /module/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[local]_[hash:base64]",
                  },
                },
              },
            ],
          },
          // this matches plain `<style>` or `<style scoped>`
          {
            use: ["style-loader", "css-loader"],
          },
        ],
      },

      {
        test: /\.scss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[local]_[hash:base64]",
                  },
                },
              },
              "sass-loader",
            ],
          },
          {
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },

      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[local]_[hash:base64]",
                  },
                },
              },
              "less-loader",
            ],
          },
          {
            use: ["style-loader", "css-loader", "less-loader"],
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
};
