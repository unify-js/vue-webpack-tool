#!/usr/bin/env node

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { Command } = require("commander");

const packageJson = require("../package.json");
const webpackDevConfig = require("../lib/webpack.dev.js");
const webpackProdConfig = require("../lib/webpack.prod.js");

const program = new Command();
program
  .name("Vue Webpack Tool")
  .description(
    "A webpack-based build tool for Vue development that focuses on the build performance."
  )
  .version(packageJson.version);

program.command("dev").action(() => {
  const compiler = webpack(webpackDevConfig);
  const server = new WebpackDevServer(webpackDevConfig.devServer, compiler);
  const runServer = async () => {
    await server.start();
  };
  runServer();
});

program.command("build").action(() => {
  webpack(webpackProdConfig, (err, stats) => {
    // https://webpack.js.org/api/node/#error-handling

    // The err object will only contain webpack-related issues, such as misconfiguration
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }

      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log(stats.toString());
  });
});

program.parse();
