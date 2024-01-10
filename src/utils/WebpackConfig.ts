import type webpack from 'webpack';
import path from 'node:path';
import fs from 'node:fs';
import { merge } from 'webpack-merge';

import { webpackCommonConfig, webpackDevConfig, webpackProdConfig, webpackDllConfig } from '../configs/index.js';
import PathInfo from './PathInfo.js';
import UserConfig from './UserConfig.js';

const userConfig = new UserConfig();
await userConfig.getUserConfig();

export default class WebpackConfig {
  projectPackageJson: {
    version: string;
    dependencies: Record<string, string>;
  };
  userConfig = userConfig;
  path = new PathInfo(userConfig.userDefinePath).path;

  constructor() {
    this.projectPackageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')) as {
      version: string;
      dependencies: Record<string, string>;
    };
  }

  async getWebpackDevConfig(options?: {
    dll?: boolean;
    lazy?: boolean;
    assetsDir?: string;
  }): Promise<webpack.Configuration> {
    return merge(
      webpackCommonConfig({
        ...this.path,
        isProduction: false,
        dll: options?.dll,
      }),
      webpackDevConfig({
        ...this.path,
        lazy: options?.lazy,
      }),
      this.userConfig.webpackConfig
    );
  }

  async getWebpackProdConfig(options?: { dll?: boolean; assetsDir?: string }): Promise<webpack.Configuration> {
    return merge(
      webpackCommonConfig({
        ...this.path,
        dll: options?.dll,
        isProduction: true,
      }),
      webpackProdConfig({ ...this.path }),
      this.userConfig.webpackConfig
    );
  }

  getWebpackDllConfig(options: { mode: 'prod' | 'dev' }): webpack.Configuration {
    return merge(
      webpackDllConfig({
        dependencies: Object.keys(this.projectPackageJson.dependencies),
        ...this.path,
      }),
      {
        mode: options.mode === 'prod' ? 'production' : 'development',
      }
    );
  }
}
