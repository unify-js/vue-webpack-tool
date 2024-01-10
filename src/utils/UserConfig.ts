import path from 'node:path';
import fs from 'node:fs';
import type webpack from 'webpack';
import { merge } from 'webpack-merge';

import type { UserConfigInterface, UserDefinePath } from '../configTypes.js';

export default class UserConfig {
  userDefinePath: UserDefinePath = {
    publicPath: '',
    assetsDir: '',
    outputDir: '',
  };

  webpackConfig: webpack.Configuration = {};

  async getUserConfig() {
    let webpackConfig: webpack.Configuration = {};

    const vueWebpackToolConfigPath = path.resolve(process.cwd(), 'vue-webpack-tool.config.mjs');

    if (fs.existsSync(vueWebpackToolConfigPath)) {
      const { default: userConfig } = (await import(vueWebpackToolConfigPath)) as {
        default: UserConfigInterface;
      };
      const { publicPath, outputDir, devServer, assetsDir } = userConfig;

      const tmpWebpackConfig: webpack.Configuration = {};
      if (publicPath) {
        tmpWebpackConfig.output = {
          publicPath: userConfig.publicPath,
        };
        this.userDefinePath.publicPath = publicPath;
      }
      if (outputDir) {
        tmpWebpackConfig.output = {
          path: outputDir,
        };
        this.userDefinePath.outputDir = outputDir;
      }
      if (devServer) tmpWebpackConfig.devServer = devServer;
      if (assetsDir) this.userDefinePath.assetsDir = assetsDir;

      webpackConfig = merge(userConfig.configureWebpack || {}, tmpWebpackConfig);
    }

    this.webpackConfig = webpackConfig;
  }
}
