#!/usr/bin/env node

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Command, Argument } from 'commander';
import fs from 'node:fs';
import path from 'node:path';

import { displayInfo, clearDllFiles, clearCacheFiles, clearOutputFiles } from './utils/index.js';
import WebpackConfig from './utils/WebpackConfig.js';

const webpackConfig = new WebpackConfig();

const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')) as {
  version: string;
  dependencies: Record<string, string>;
};

const program = new Command();
program
  .name('Vue Webpack Tool')
  .description('A webpack-based build tool for Vue development that focuses on the build performance.')
  .version(packageJson.version);

program
  .command('start')
  .description('start dev server')
  .action(async () => {
    const webpackDevConfig = await webpackConfig.getWebpackDevConfig();
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
  .action(async () => {
    const webpackProdConfig = await webpackConfig.getWebpackProdConfig();
    webpack(webpackProdConfig, displayInfo);
  });

program
  .command('dll')
  .description('generate DLL file')
  .addArgument(new Argument('<mode>', 'generate DLL files for development or production').choices(['dev', 'prod']))
  .action((arg) => {
    clearDllFiles(webpackConfig.dllDirectory);
    webpack(webpackConfig.getWebpackDllConfig({ mode: arg.mode }), displayInfo);
  });

program
  .command('clear')
  .description('clear all generate file')
  .option('--cache', 'only clear cache files')
  .option('--output', 'only clear output files')
  .option('--dll', 'only clear dll files')
  .action((options) => {
    const all = Object.keys(options).length === 0;
    if (all || options.cache) clearCacheFiles(webpackConfig.cacheDirectory);
    if (all || options.output) clearOutputFiles(webpackConfig.outputDir);
    if (all || options.dll) clearDllFiles(webpackConfig.dllDirectory);
  });

program.parse();
