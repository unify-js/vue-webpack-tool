const esbuild = require("./esbuild");
const style = require("./style");

module.exports = [...esbuild, ...style];
