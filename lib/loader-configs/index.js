const esbuild = require("./esbuild");
const style = require("./style");
const asset = require("./asset");

module.exports = [...esbuild, ...style, ...asset];
