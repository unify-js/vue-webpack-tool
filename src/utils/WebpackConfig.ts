import type webpack from 'webpack';
import path from 'node:path';
import fs from 'node:fs';
import { merge } from 'webpack-merge';

import type { UserConfig } from '../configTypes.js';
import { webpackCommonConfig, webpackDevConfig, webpackProdConfig, webpackDllConfig } from '../configs/index.js';

export default class WebpackConfig {
  outputDir: string;
  tempDirectory: string;
  cacheDirectory: string;
  dllDirectory: string;
  dllManifestPath: string;
  projectPackageJson: {
    version: string;
    dependencies: Record<string, string>;
  };

  constructor() {
    const contextDirectory = process.cwd();
    this.outputDir = path.resolve(contextDirectory, 'dist');
    this.tempDirectory = path.resolve(contextDirectory, '.temp');
    this.cacheDirectory = path.resolve(this.tempDirectory, '.temp_cache');
    this.dllDirectory = path.resolve(this.tempDirectory, '.dll');
    this.dllManifestPath = path.resolve(this.dllDirectory, 'vendor-manifest.json');

    this.projectPackageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')) as {
      version: string;
      dependencies: Record<string, string>;
    };
  }

  private async getUserConfig(): Promise<UserConfig> {
    let tempConfig: UserConfig = {};
    const vueWebpackToolConfigPath = path.resolve(process.cwd(), 'vue-webpack-tool.config.mjs');
    if (fs.existsSync(vueWebpackToolConfigPath)) {
      tempConfig = await import(vueWebpackToolConfigPath);
    }

    return tempConfig;
  }

  async getWebpackDevConfig(): Promise<webpack.Configuration> {
    const useConfig = await this.getUserConfig();

    return merge(
      webpackCommonConfig({
        outputDir: this.outputDir,
        dllManifestPath: this.dllManifestPath,
        dllDirectory: this.dllDirectory,
      }),
      webpackDevConfig({
        outputDir: this.outputDir,
        cacheDirectory: this.cacheDirectory,
      }),
      useConfig.configureWebpack || {}
    );
  }

  async getWebpackProdConfig(): Promise<webpack.Configuration> {
    const useConfig = await this.getUserConfig();

    return merge(
      webpackCommonConfig({
        outputDir: this.outputDir,
        dllManifestPath: this.dllManifestPath,
        dllDirectory: this.dllDirectory,
      }),
      webpackProdConfig(),
      useConfig.configureWebpack || {}
    );
  }

  getWebpackDllConfig(options: { mode: 'prod' | 'dev' }): webpack.Configuration {
    return merge(
      webpackDllConfig({
        dependencies: Object.keys(this.projectPackageJson.dependencies),
        dllDirectory: this.dllDirectory,
        dllManifestPath: this.dllManifestPath,
      }),
      {
        mode: options.mode === 'prod' ? 'production' : 'development',
      }
    );
  }
}