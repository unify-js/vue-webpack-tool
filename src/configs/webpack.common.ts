import HTMLWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import webpack from 'webpack';
import fs from 'node:fs';

import loaderConfig from './loader-configs/index.js';
import { HtmlInjectDllPlugin } from './plugins/index.js';

export default function createWebpackCommonConfig(options: {
  outputDir: string;
  dllManifestPath: string;
  dllDirectory: string;
  dll?: boolean;
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
      })
    );
  }

  return {
    entry: './src/main',

    output: {
      filename: '[name].[contenthash].js',
      path: options.outputDir,
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
