const webpack = require("webpack");
const { merge } = require("webpack-merge");
const fs = require("node:fs");

const createWebpackCommonConfig = require("./webpack.common.js");
const { cacheDirectory, dllDirectory, dllManifestPath } = require("./utils.js");

module.exports = function createWebpackDevConfig() {
  const plugins = [];

  if (fs.existsSync(dllManifestPath)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        context: dllDirectory,
        manifest: require(dllManifestPath),
      })
    );
  }

  const webpackCommonConfig = createWebpackCommonConfig();

  return merge(webpackCommonConfig, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
      static: webpackCommonConfig.output.path,
      // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
      historyApiFallback: true,
    },

    plugins,

    experiments: {
      lazyCompilation: true,
    },

    cache: {
      type: "filesystem",
      cacheDirectory,
    },
  });
};
