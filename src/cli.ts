#!/usr/bin/env node

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Command, Option } from 'commander';
import fs from 'node:fs';
import { merge } from 'webpack-merge';
import ora from 'ora';

import { cacheDirectory, projectOutputDirectory, projectPackageJson, dllDirectory, clearDir } from './utils/index.js';
import createWebpackDevConfig from './configs/webpack.dev.js';
import createWebpackProdConfig from './configs/webpack.prod.js';
import createWebpackDllConfig from './configs/webpack.dll.js';

const program = new Command();
program
  .name('Vue Webpack Tool')
  .description('A webpack-based build tool for Vue development that focuses on the build performance.')
  .version(projectPackageJson.version);

program
  .command('dev')
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

program
  .command('build')
  .description('build for production')
  .action(() => {
    const webpackProdConfig = createWebpackProdConfig();
    webpack(webpackProdConfig, displayInfo);
  });

program
  .command('dll')
  .description('manage DLL file')
  .addOption(
    new Option(
      '-g, --generate <type>',
      'generate DLL files. Pass "dev" to generate DLL files for development, pass "prod" to generate DLL files for production.'
    ).choices(['dev', 'prod'])
  )
  .option('-c, --clear', 'clear the generated DLL files')
  .action((options) => {
    if (options.generate) {
      webpack(
        merge(createWebpackDllConfig(), {
          mode: options.generate === 'prod' ? 'production' : 'development',
        }),
        displayInfo
      );
    }

    if (options.clear) {
      const spinner = ora('clearing old DLL files...').start();
      fs.rmSync(dllDirectory, { force: true, recursive: true });
      spinner.succeed('old dll files cleared!');
    }
  });

program
  .command('clear')
  .description('clear all generate file')
  .option('--cache', 'only clear cache files')
  .option('--output', 'only clear output files')
  .option('--dll', 'only clear dll files')
  .action((options) => {
    const all = Object.keys(options).length === 0;

    if (all || options.cache) {
      const spinner = ora('clearing old cache files...').start();
      fs.rmSync(cacheDirectory, { force: true, recursive: true });
      spinner.succeed('old cache files cleared!');
    }

    if (all || options.output) {
      const spinner = ora('clearing old output files...').start();
      fs.rmSync(projectOutputDirectory, {
        force: true,
        recursive: true,
      });
      spinner.succeed('old output files cleared !');
    }

    if (all || options.dll) {
      const spinner = ora('clearing old dll files...').start();
      fs.rmSync(dllDirectory, {
        force: true,
        recursive: true,
      });
      spinner.succeed('old dll files cleared!');
    }
  });

program.parse();
