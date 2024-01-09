// https://github.com/privatenumber/esbuild-loader-examples/blob/master/examples/vue-loader/webpack.config.js

export default [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'esbuild-loader',
    options: {
      loader: 'js',
      target: 'es2015',
    },
  },

  {
    test: /\.jsx$/,
    exclude: /node_modules/,
    loader: 'esbuild-loader',
    options: {
      loader: 'jsx',
      target: 'es2015',
    },
  },

  {
    test: /\.ts$/,
    exclude: /node_modules/,
    loader: 'esbuild-loader',
    options: {
      loader: 'ts',
      target: 'es2015',
    },
  },

  {
    test: /\.tsx$/,
    exclude: /node_modules/,
    loader: 'esbuild-loader',
    options: {
      loader: 'tsx',
      target: 'es2015',
    },
  },
];
