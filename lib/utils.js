const path = require("path");

const cacheDirectory = path.resolve(process.cwd(), ".temp_cache");

module.exports = {
  cacheDirectory,
};
