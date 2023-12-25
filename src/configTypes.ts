import type webpack from 'webpack';

export interface ProjectConfig {
  assetsDir?: string;
  publicPath?: string;
  outputDir?: string;
  devServer?: webpack.Configuration['devServer'];
  configureWebpack?: webpack.Configuration;
  css: {
    loaderOptions?: {
      css: Record<string, unknown>;
      sass: Record<string, unknown>;
      less: Record<string, unknown>;
    };
  };
}
