import type webpack from 'webpack';

export default function createWebpackDevConfig(options: {
  outputDir: string;
  cacheDirectory: string;
}): webpack.Configuration {
  return {
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
  };
}
