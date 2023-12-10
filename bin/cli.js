#!/usr/bin/env node

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { Command } = require("commander");

const packageJson = require("../package.json");
const webpackDevConfig = require("../webpack.dev.js");

const program = new Command();
program
  .name("vue-webpack-tool")
  .description("CLI to build Vue.js apps")
  .version(packageJson.version);

program.command("dev").action(() => {
  const compiler = Webpack(webpackDevConfig);
  const server = new WebpackDevServer(webpackDevConfig.devServer, compiler);
  const runServer = async () => {
    await server.start();
  };
  runServer();
});

program.parse();
