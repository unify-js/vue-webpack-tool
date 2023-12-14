import webpack from 'webpack';

import { dllDirectory, dllManifestPath, projectPackageJson } from '../utils/index.js';

export default function createWebpackDllConfig(): webpack.Configuration {
  const dllname = 'vendor_[fullhash]';

  return {
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    entry: {
      vendor: Object.keys(projectPackageJson.dependencies),
    },
    output: {
      filename: 'vendor_dll_[fullhash].js',
      path: dllDirectory,
      library: dllname,
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      }),
      new webpack.DllPlugin({
        name: dllname,
        path: dllManifestPath,
        entryOnly: true,
        format: true,
      }),
    ],
  };
}
