import type webpack from 'webpack';

export interface UserConfig {
  publicPath?: string;
  outputDir?: string;
  assetsDir?: string;
  configureWebpack?: webpack.Configuration;
}
