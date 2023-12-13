import { merge } from 'webpack-merge';

import createWebpackCommonConfig from './webpack.common.js';

export default function createWebpackProdConfig() {
  const common = createWebpackCommonConfig();

  return merge(common, {
    mode: 'production',
  });
}
