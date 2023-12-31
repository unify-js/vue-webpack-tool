import { merge } from 'webpack-merge';

import type webpack from 'webpack';

export default function createWebpackDevConfig(options: {
  outputDir: string;
  cacheDirectory: string;
  lazy?: boolean;
  publicPath: string;
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
        static: {
          directory: options.outputDir,
          publicPath: options.publicPath,
        },
        // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
        historyApiFallback: {
          rewrites: [{ from: /./, to: `${options.publicPath}index.html` }],
        },
      },

      output: {
        // https://webpack.js.org/guides/build-performance/#output-without-path-info
        pathinfo: false,
      },

      cache: {
        type: 'filesystem',
        cacheDirectory: options.cacheDirectory,
      },

      // https://webpack.js.org/guides/build-performance/#minimal-entry-chunk
      // https://webpack.js.org/guides/build-performance/#avoid-extra-optimization-steps
      optimization: {
        runtimeChunk: 'single',
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      },
    },
    tmpConfig
  );
}
