import type webpack from 'webpack';
import { merge } from 'webpack-merge';

import createWebpackCommonConfig from './webpack.common.js';
import { cacheDirectory } from '../utils/index.js';

export default function createWebpackDevConfig(): webpack.Configuration {
  const webpackCommonConfig = createWebpackCommonConfig();

  return merge(webpackCommonConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      static: webpackCommonConfig.output!.path,
      // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
      historyApiFallback: true,
    },

    cache: {
      type: 'filesystem',
      cacheDirectory,
    },
  });
}
