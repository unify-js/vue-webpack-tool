#!/usr/bin/env node

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Command } from 'commander';
import fs from 'node:fs';
import { merge } from 'webpack-merge';

import { cacheDirectory, outputDirectory, projectPackageJson } from './utils/index.js';
import createWebpackDevConfig from './configs/webpack.dev.js';
import createWebpackProdConfig from './configs/webpack.prod.js';
import createWebpackDllConfig from './configs/webpack.dll.js';

const program = new Command();
program
  .name('Vue Webpack Tool')
  .description('A webpack-based build tool for Vue development that focuses on the build performance.')
  .version(projectPackageJson.version);

program.command('dev').action(() => {
  const webpackDevConfig = createWebpackDevConfig();
  const compiler = webpack(webpackDevConfig);
  const server = new WebpackDevServer(webpackDevConfig.devServer, compiler);
  const runServer = async () => {
    await server.start();
  };
  runServer();
});

function displayInfo(err: Error | undefined, stats: webpack.Stats | undefined) {
  // https://webpack.js.org/api/node/#error-handling

  // The err object will only contain webpack-related issues, such as misconfiguration
  if (err) {
    console.error(err.stack || err);

    return;
  }

  if (stats) {
    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log(stats.toString());
  }
}

program.command('build').action(() => {
  const webpackProdConfig = createWebpackProdConfig();
  webpack(webpackProdConfig, displayInfo);
});

program
  .command('dll')
  .option('--dev', 'dev mode dll')
  .action((options) => {
    console.log('Clearing output...');
    fs.rmSync(outputDirectory, { force: true, recursive: true });
    console.log('Output cleared!');

    webpack(
      merge(createWebpackDllConfig(), {
        mode: options.dev ? 'development' : 'production',
      }),
      displayInfo
    );
  });

program
  .command('clear')
  .option('--all', 'clear all generated files')
  .option('--cache', 'clear cache')
  .option('--output', 'clear output')
  .action((options) => {
    const all = Object.keys(options).length === 0 || options.all;

    if (all || options.cache) {
      console.log('Clearing cache...');
      fs.rmSync(cacheDirectory, { force: true, recursive: true });
      console.log('Cache cleared!');
    }

    if (all || options.output) {
      console.log('Clearing output...');
      fs.rmSync(outputDirectory, {
        force: true,
        recursive: true,
      });
      console.log('Output cleared!');
    }
  });

program.parse();
