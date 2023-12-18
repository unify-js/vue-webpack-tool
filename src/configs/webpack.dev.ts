import { merge } from 'webpack-merge';

import type webpack from 'webpack';

export default function createWebpackDevConfig(options: {
  outputDir: string;
  cacheDirectory: string;
  lazy?: boolean;
}): webpack.Configuration {
  const tmpConfig: webpack.Configuration = {};

  if (options.lazy) {
    tmpConfig.experiments = {
      lazyCompilation: true,
    };
  }

  return merge(
    {
      mode: 'development',
      devtool: 'eval-source-map',
      devServer: {
        static: options.outputDir,
        // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
        historyApiFallback: true,
      },

      cache: {
        type: 'filesystem',
        cacheDirectory: options.cacheDirectory,
      },
    },
    tmpConfig
  );
}
