import type webpack from 'webpack';

export interface UserDefinePath {
  assetsDir?: string;
  publicPath?: string;
  outputDir?: string;
}

export type UserConfigInterface = UserDefinePath & {
  devServer?: webpack.Configuration['devServer'];
  configureWebpack?: webpack.Configuration;
  css: {
    loaderOptions?: {
      css: Record<string, unknown>;
      sass: Record<string, unknown>;
      less: Record<string, unknown>;
    };
  };
};
