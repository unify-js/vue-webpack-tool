const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");
const { cacheDirectory } = require("./utils.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: common.output.path,
    // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
    historyApiFallback: true,
  },

  experiments: {
    lazyCompilation: true,
  },

  cache: {
    type: "filesystem",
    cacheDirectory,
  },
});
