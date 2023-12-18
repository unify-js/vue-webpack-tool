#!/usr/bin/env node

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Command, Argument } from 'commander';
import fs from 'node:fs';
import path from 'node:path';

import { displayInfo, clearOldFiles, clearDllFiles } from './utils/index.js';
import WebpackConfig from './utils/WebpackConfig.js';

const webpackConfig = new WebpackConfig();

const packageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')) as {
  version: string;
  dependencies: Record<string, string>;
};

const program = new Command();
program
  .name('vue-webpack-tool')
  .description('A webpack-based build tool for Vue development that focuses on the build performance.')
  .version(packageJson.version);

program
  .command('start')
  .description('start dev server')
  .option('--dll', 'use dll')
  .option('--lazy', 'use lazy compilation')
  .action(async (options) => {
    const webpackDevConfig = await webpackConfig.getWebpackDevConfig({
      dll: options.dll,
      lazy: options.lazy,
    });
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
  .option('--dll', 'use dll')
  .action(async (options) => {
    const webpackProdConfig = await webpackConfig.getWebpackProdConfig({
      dll: options.dll,
    });
    webpack(webpackProdConfig, displayInfo);
  });

program
  .command('dll')
  .description('Generate DLL file')
  .option('--dev', 'generate DLL file for development. (default option)')
  .option('--prod', 'generate DLL file for production')
  .action((options) => {
    let mode: 'dev' | 'prod' = 'dev';
    if (options.prod) mode = 'prod';

    clearDllFiles(webpackConfig.dllDirectory);
    webpack(webpackConfig.getWebpackDllConfig({ mode }), displayInfo);
  });

program
  .command('clear')
  .description('clear all generated files')
  .action(() => {
    clearOldFiles(webpackConfig.tempDirectory);
  });

program.parse();
