import type webpack from 'webpack';

export interface UserConfig {
  publicPath?: string;
  outputDir?: string;
  devServer?: webpack.Configuration['devServer'];
  configureWebpack?: webpack.Configuration;
}
