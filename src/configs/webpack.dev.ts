import webpack from 'webpack';
import { merge } from 'webpack-merge';
import fs from 'node:fs';

import createWebpackCommonConfig from './webpack.common.js';
import { cacheDirectory, dllDirectory, dllManifestPath } from '../utils/index.js';

export default function createWebpackDevConfig(): webpack.Configuration {
  const plugins: webpack.Configuration['plugins'] = [];

  if (fs.existsSync(dllManifestPath)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        context: dllDirectory,
        manifest: JSON.parse(fs.readFileSync(dllManifestPath, 'utf-8')),
      })
    );
  }

  const webpackCommonConfig = createWebpackCommonConfig();

  return merge(webpackCommonConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      static: webpackCommonConfig.output!.path,
      // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
      historyApiFallback: true,
    },

    plugins,

    experiments: {
      lazyCompilation: true,
    },

    cache: {
      type: 'filesystem',
      cacheDirectory,
    },
  });
}
