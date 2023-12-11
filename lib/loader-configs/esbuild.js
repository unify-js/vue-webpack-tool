// https://github.com/privatenumber/esbuild-loader-examples/blob/master/examples/vue-loader/webpack.config.js

module.exports = [
  {
    test: /\.js$/,
    loader: "esbuild-loader",
    options: {
      loader: "js",
      target: "es2015",
    },
  },

  {
    test: /\.jsx$/,
    loader: "esbuild-loader",
    options: {
      loader: "jsx",
      target: "es2015",
    },
  },

  {
    test: /\.ts$/,
    loader: "esbuild-loader",
    options: {
      loader: "ts",
      target: "es2015",
    },
  },

  {
    test: /\.tsx$/,
    loader: "esbuild-loader",
    options: {
      loader: "tsx",
      target: "es2015",
    },
  },
];
