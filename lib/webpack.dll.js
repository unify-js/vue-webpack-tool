const path = require("node:path");
const webpack = require("webpack");

const { dllDirectory, dllManifestPath } = require("./utils.js");

const projectPackageJson = require(path.resolve(process.cwd(), "package.json"));

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    vendors: Object.keys(projectPackageJson.dependencies),
  },
  output: {
    path: dllDirectory,
    filename: "vendors.dll.js",
    library: "vendors_[fullhash]",
  },
  plugins: [
    new webpack.DllPlugin({
      context: dllDirectory,
      path: dllManifestPath,
      name: "vendors_[fullhash]",
      entryOnly: true,
    }),
  ],
};
