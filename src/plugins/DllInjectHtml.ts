import HtmlWebpackPlugin from 'html-webpack-plugin';
import type webpack from 'webpack';

const pluginName = 'DllInjectHtml';

export default class DllInjectHtml {
  dllfiles: string[];

  constructor(dllfiles: string[]) {
    this.dllfiles = dllfiles;
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      console.log('The compiler is starting a new compilation...');

      // Static Plugin interface |compilation |HOOK NAME | register listener
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName, // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // Manipulate the content
          data.assets.js.unshift(...this.dllfiles);
          // Tell webpack to move on
          cb(null, data);
        }
      );
    });
  }
}
