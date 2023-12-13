const path = require("node:path");

const cacheDirectory = path.resolve(process.cwd(), ".temp_cache");
const dllDirectory = path.resolve(process.cwd(), ".dll");
const dllManifestPath = path.resolve(dllDirectory, "vendors-manifest.json");
const outputDirectory = path.resolve(process.cwd(), "dist");

module.exports = {
  cacheDirectory,
  dllDirectory,
  dllManifestPath,
  outputDirectory,
};
