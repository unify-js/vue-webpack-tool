import HTMLWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import webpack from 'webpack';
import fs from 'node:fs';

import loaderConfig from './loader-configs/index.js';
import { projectOutputDirectory, dllManifestPath, dllDirectory } from '../utils/index.js';
import { HtmlInjectDllPlugin } from './plugins/index.js';

export default function createWebpackCommonConfig(): webpack.Configuration {
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

  if (fs.existsSync(dllManifestPath)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        manifest: JSON.parse(fs.readFileSync(dllManifestPath, 'utf-8')),
        context: process.cwd(),
      })
    );

    plugins.push(
      new HtmlInjectDllPlugin({
        projectOutputDirectory,
        dllDirectory,
        dllFileNamePrefix: 'vendor_dll_',
      })
    );
  }

  return {
    entry: './src/main',

    output: {
      filename: '[name].[contenthash].js',
      path: projectOutputDirectory,
      clean: true,
    },

    resolve: {
      // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
      extensions: ['.ts', '.js', '.tsx', '.json', '.wasm'],
    },

    plugins,

    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
        ...loaderConfig,
      ],
    },
    // https://webpack.js.org/guides/caching/
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
}
