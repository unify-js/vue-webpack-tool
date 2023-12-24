import type webpack from 'webpack';

export interface ProjectConfig {
  assetsDir?: string;
  publicPath?: string;
  outputDir?: string;
  devServer?: webpack.Configuration['devServer'];
  configureWebpack?: webpack.Configuration;
}
