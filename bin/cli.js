#!/usr/bin/env node

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { Command } = require("commander");
const fs = require("fs");
const { merge } = require("webpack-merge");

const packageJson = require("../package.json");
const {
  cacheDirectory,
  dllDirectory,
  outputDirectory,
} = require("../lib/utils.js");
const createWebpackDevConfig = require("../lib/webpack.dev.js");
const createWebpackProdConfig = require("../lib/webpack.prod.js");
const webpackDllConfig = require("../lib/webpack.dll.js");

const program = new Command();
program
  .name("Vue Webpack Tool")
  .description(
    "A webpack-based build tool for Vue development that focuses on the build performance."
  )
  .version(packageJson.version);

program.command("dev").action(() => {
  const webpackDevConfig = createWebpackDevConfig();
  const compiler = webpack(webpackDevConfig);
  const server = new WebpackDevServer(webpackDevConfig.devServer, compiler);
  const runServer = async () => {
    await server.start();
  };
  runServer();
});

function displayInfo(err, stats) {
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
}

program.command("build").action(() => {
  const webpackProdConfig = createWebpackProdConfig();
  webpack(webpackProdConfig, displayInfo);
});

program
  .command("dll")
  .option("--dev", "dev mode dll")
  .action((options) => {
    console.log("Clearing dll...");
    fs.rmSync(dllDirectory, { force: true, recursive: true });
    console.log("Dll cleared!");

    webpack(
      merge(webpackDllConfig, {
        mode: options.dev ? "development" : "production",
      }),
      displayInfo
    );
  });

program
  .command("clear")
  .option("--all", "clear all generated files")
  .option("--cache", "clear cache")
  .option("--dll", "clear dll")
  .option("--output", "clear output")
  .action((options) => {
    const all = Object.keys(options).length === 0 || options.all;

    if (all || options.cache) {
      console.log("Clearing cache...");
      fs.rmSync(cacheDirectory, { force: true, recursive: true });
      console.log("Cache cleared!");
    }

    if (all || options.dll) {
      console.log("Clearing dll...");
      fs.rmSync(dllDirectory, { force: true, recursive: true });
      console.log("Dll cleared!");
    }

    if (all || options.output) {
      console.log("Clearing output...");
      fs.rmSync(outputDirectory, {
        force: true,
        recursive: true,
      });
      console.log("Output cleared!");
    }
  });

program.parse();
