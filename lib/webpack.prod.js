const webpack = require("webpack");
const { merge } = require("webpack-merge");
const fs = require("node:fs");

const common = require("./webpack.common.js");

const { dllDirectory, dllManifestPath } = require("./utils.js");

const plugins = [];

if (fs.existsSync(dllManifestPath)) {
  plugins.push(
    new webpack.DllReferencePlugin({
      context: dllDirectory,
      manifest: require(dllManifestPath),
    })
  );
}

module.exports = merge(common, {
  mode: "production",
  plugins,
});
