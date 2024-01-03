import HTMLWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import webpack from 'webpack';
import fs from 'node:fs';
import path from 'node:path';

import loaderConfig from './loader-configs/index.js';
import { HtmlInjectDllPlugin } from './plugins/index.js';
import type { UserConfig } from '../configTypes.js';

export default function createWebpackCommonConfig(options: {
  outputDir: string;
  dllManifestPath: string;
  dllDirectory: string;
  dll?: boolean;
  publicPath: string;
  assetsDir: string;
  isProduction: boolean;
  css?: UserConfig['css'];
}): webpack.Configuration {
  const plugins: webpack.Configuration['plugins'] = [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new VueLoaderPlugin(),
  ];

  if (options.dll && fs.existsSync(options.dllManifestPath)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        manifest: JSON.parse(fs.readFileSync(options.dllManifestPath, 'utf-8')),
        context: process.cwd(),
      })
    );

    plugins.push(
      new HtmlInjectDllPlugin({
        projectOutputDirectory: options.outputDir,
        dllDirectory: options.dllDirectory,
        dllFileNamePrefix: 'vendor_dll_',
        publicPath: options.publicPath,
      })
    );
  }

  return {
    entry: './src/main',

    output: {
      filename: path.join(options.assetsDir, 'js/[name].[contenthash].js'),
      path: options.outputDir,
      clean: true,
    },

    resolve: {
      // https://webpack.js.org/configuration/resolve/#resolveextensions
      extensions: ['.ts', '.js', '.tsx', '.vue', '.json', '.wasm'],
      alias: {
        '@': path.resolve(process.cwd(), 'src/'),
      },
    },

    plugins,

    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
        ...loaderConfig({ assetsDir: options.assetsDir, isProduction: options.isProduction, css: options.css }),
      ],
    },
  };
}
