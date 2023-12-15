#!/usr/bin/env node

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Command, Argument } from 'commander';
import { merge } from 'webpack-merge';

import { projectPackageJson, displayInfo, clearDllFiles, clearCacheFiles, clearOutputFiles } from './utils/index.js';
import createWebpackDevConfig from './configs/webpack.dev.js';
import createWebpackProdConfig from './configs/webpack.prod.js';
import createWebpackDllConfig from './configs/webpack.dll.js';

const program = new Command();
program
  .name('Vue Webpack Tool')
  .description('A webpack-based build tool for Vue development that focuses on the build performance.')
  .version(projectPackageJson.version);

program
  .command('start')
  .description('start dev server')
  .action(() => {
    const webpackDevConfig = createWebpackDevConfig();
    const compiler = webpack(webpackDevConfig);
    const server = new WebpackDevServer(webpackDevConfig.devServer, compiler);
    const runServer = async () => {
      await server.start();
    };
    runServer();
  });

program
  .command('build')
  .description('build for production')
  .action(() => {
    const webpackProdConfig = createWebpackProdConfig();
    webpack(webpackProdConfig, displayInfo);
  });

program
  .command('dll')
  .description('generate DLL file')
  .addArgument(new Argument('<mode>', 'generate DLL files for development or production').choices(['dev', 'prod']))
  .action((arg) => {
    clearDllFiles();
    webpack(
      merge(createWebpackDllConfig(), {
        mode: arg === 'prod' ? 'production' : 'development',
      }),
      displayInfo
    );
  });

program
  .command('clear')
  .description('clear all generate file')
  .option('--cache', 'only clear cache files')
  .option('--output', 'only clear output files')
  .option('--dll', 'only clear dll files')
  .action((options) => {
    const all = Object.keys(options).length === 0;
    if (all || options.cache) clearCacheFiles();
    if (all || options.output) clearOutputFiles();
    if (all || options.dll) clearDllFiles();
  });

program.parse();
