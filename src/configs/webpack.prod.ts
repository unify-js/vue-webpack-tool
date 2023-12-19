import type webpack from 'webpack';

export default function createWebpackProdConfig(): webpack.Configuration {
  return {
    mode: 'production',

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
