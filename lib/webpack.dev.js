const { merge } = require("webpack-merge");
const path = require("node:path");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
    historyApiFallback: true,
  },

  experiments: {
    lazyCompilation: true,
  },

  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(process.cwd(), ".temp_cache"),
  },
});
