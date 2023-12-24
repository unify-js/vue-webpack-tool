import type webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'node:path';

export default function createWebpackProdConfig(options: { assetsDir: string }): webpack.Configuration {
  return {
    mode: 'production',

    plugins: [
      new MiniCssExtractPlugin({
        filename: path.join(options.assetsDir, 'css/[name].[contenthash].css'),
      }),
    ],

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
}
