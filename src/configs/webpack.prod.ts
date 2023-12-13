import webpack from 'webpack';
import { merge } from 'webpack-merge';
import fs from 'node:fs';

import createWebpackCommonConfig from './webpack.common.js';
import { dllDirectory, dllManifestPath } from '../utils/index.js';

export default function createWebpackProdConfig() {
  const plugins = [];

  if (fs.existsSync(dllManifestPath)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        context: dllDirectory,
        manifest: JSON.parse(fs.readFileSync(dllManifestPath, 'utf-8')),
      })
    );
  }

  const common = createWebpackCommonConfig();

  return merge(common, {
    mode: 'production',
    plugins,
  });
}
