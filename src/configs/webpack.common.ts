import HTMLWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import webpack from 'webpack';

import loaderConfig from './loader-configs/index.js';
import { outputDirectory } from '../utils/index.js';

export default function createWebpackCommonConfig(): webpack.Configuration {
  return {
    entry: './src/main',

    output: {
      filename: '[name].[contenthash].js',
      path: outputDirectory,
      clean: true,
    },

    resolve: {
      // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
      extensions: ['.ts', '.js', '.tsx', '.json', '.wasm'],
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      }),
      new HTMLWebpackPlugin({
        template: './index.html',
      }),
      new VueLoaderPlugin(),
    ],

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
