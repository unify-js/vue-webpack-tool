import webpack from 'webpack';

import { dllDirectory, dllManifestPath, projectPackageJson } from '../utils/index.js';

export default function createWebpackDllConfig(): webpack.Configuration {
  return {
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    entry: {
      vendors: Object.keys(projectPackageJson.dependencies),
    },
    output: {
      path: dllDirectory,
      filename: 'vendors.dll.js',
      library: 'vendors_[fullhash]',
    },
    plugins: [
      new webpack.DllPlugin({
        context: dllDirectory,
        path: dllManifestPath,
        name: 'vendors_[fullhash]',
        entryOnly: true,
      }),
    ],
  };
}
