import type webpack from 'webpack';

export default function createWebpackProdConfig(): webpack.Configuration {
  return {
    mode: 'production',
  };
}
