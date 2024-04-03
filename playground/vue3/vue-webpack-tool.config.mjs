import { fileURLToPath } from 'node:url'

/** @type {import('@unify-js/vue-webpack-tool/bin/configTypes').UserConfigInterface} */
const config = {
  // ...
  outputDir: fileURLToPath(new URL('dist', import.meta.url)),
  assetsDir: 'assets'
};

export default config;
