#!/usr/bin/env node

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const webpackDevConfig = require("../webpack.dev.js");

const compiler = Webpack(webpackDevConfig);
const server = new WebpackDevServer(webpackDevConfig.devServer, compiler);

const runServer = async () => {
  console.log("Starting server...");
  await server.start();
};

runServer();
