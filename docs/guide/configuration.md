# Configuration

`vue-webpack-tool.config.mjs` is an optional config file that will be automatically loaded by Vue Webpack Tool.

The file should export an object containing options:

```js
// vue-webpack-tool.config.mjs

/** @type {import('@unify-js/vue-webpack-tool/bin/configTypes').ProjectConfig} */
export default {
  // ...
};
```

## publicPath

- Type: `string`
- Default: `/`

Specify the base path for all the assets within your application.

## outputDir

- Type: `string`
- Default: `dist`

## devServer

- Type: `webpack.Configuration['devServer']`

[All options](https://webpack.js.org/configuration/dev-server/) for webpack-dev-server are supported.

## configureWebpack

- Type: `webpack.Configuration`

The object will be merged into the final config using webpack-merge.
