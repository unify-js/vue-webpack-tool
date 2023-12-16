import webpack from 'webpack';

export default function createWebpackDllConfig(options: {
  dependencies: string[];
  dllDirectory: string;
  dllManifestPath: string;
}): webpack.Configuration {
  const dllname = 'vendor_[fullhash]';

  return {
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    entry: {
      vendor: options.dependencies,
    },
    output: {
      filename: 'vendor_dll_[fullhash].js',
      path: options.dllDirectory,
      library: dllname,
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      }),
      new webpack.DllPlugin({
        name: dllname,
        path: options.dllManifestPath,
        entryOnly: true,
        format: true,
      }),
    ],
  };
}
