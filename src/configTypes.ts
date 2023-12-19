import type webpack from 'webpack';

export interface ProjectConfig {
  publicPath?: string;
  outputDir?: string;
  devServer?: webpack.Configuration['devServer'];
  configureWebpack?: webpack.Configuration;
}
