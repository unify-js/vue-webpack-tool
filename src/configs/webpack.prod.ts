import type webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'node:path';

function getName(context: string) {
  const regexp = /[\\/]node_modules[\\/]/;
  const result = context.split(regexp)[1];

  const tmp = result.split(/[\\/]/);
  if (result.includes('@')) {
    return `npm.${tmp[0]}.${tmp[1]}`.replace('@', '');
  } else {
    return `npm.${tmp[0]}`;
  }
}

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
            name(module: any) {
              return getName(module.context);
            },
            chunks: 'all',
          },
        },
      },
    },
  };
}
