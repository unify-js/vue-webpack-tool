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

For example:

```ts
export default {
  publicPath: '/app1/',
};
```

## outputDir

- Type: `string`
- Default: `dist`

The directory where the production build files will be generated in when running `vue-webpack-tool` build. Note the target directory contents will be removed before building.

For example:

```ts
export default {
  outputDir: 'dist',
};
```

## assetsDir

- Type: `string`
- Default: `''`

A directory `(relative to outputDir)` to nest generated static assets (js, css, img, fonts) under.

For example:

```js
export default {
  assetsDir: 'assets',
};
```

## devServer

- Type: `webpack.Configuration['devServer']`

[All options](https://webpack.js.org/configuration/dev-server/) for webpack-dev-server are supported.

## configureWebpack

- Type: `webpack.Configuration`

The object will be merged into the final config using [webpack-merge](https://github.com/survivejs/webpack-merge).
