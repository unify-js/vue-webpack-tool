import HtmlWebpackPlugin from 'html-webpack-plugin';
import type webpack from 'webpack';
import fs from 'node:fs';
import path from 'node:path';

const pluginName = 'HtmlInjectDllPlugin';

interface Options {
  projectOutputDirectory: string;
  dllDirectory: string;
  dllFileNamePrefix: string;
  publicPath: string;
}

/** Copy the DLL file to the output folder and add the script tag to the HTML file. */
export default class HtmlInjectDllPlugin {
  projectOutputDirectory: string;
  dllDirectory: string;
  dllFileNamePrefix: string;
  publicPath: string;

  constructor(options: Options) {
    this.projectOutputDirectory = options.projectOutputDirectory;
    this.dllDirectory = options.dllDirectory;
    this.dllFileNamePrefix = options.dllFileNamePrefix;
    this.publicPath = options.publicPath;
  }

  getDllFiles() {
    const dllFiles = fs
      .readdirSync(this.dllDirectory)
      .filter((item) => item.startsWith(this.dllFileNamePrefix) && item.endsWith('.js'));

    return dllFiles;
  }

  copyFile(dllFiles: string[]) {
    try {
      fs.statSync(this.projectOutputDirectory);
    } catch (error) {
      fs.mkdirSync(this.projectOutputDirectory);
    }

    for (const dllFile of dllFiles) {
      const src = path.resolve(this.dllDirectory, dllFile);
      const dest = path.resolve(this.projectOutputDirectory, dllFile);
      fs.copyFileSync(src, dest);
    }
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(pluginName, (data, cb) => {
        const dllfiles = this.getDllFiles().map((item) => `${this.publicPath}${item}`);
        data.assets.js.unshift(...dllfiles);
        cb(null, data);
      });
    });

    compiler.hooks.afterEmit.tap(pluginName, () => {
      const dllfiles = this.getDllFiles();
      this.copyFile(dllfiles);
    });
  }
}
