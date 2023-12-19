import type webpack from 'webpack';
import path from 'node:path';
import fs from 'node:fs';
import { merge } from 'webpack-merge';

import type { ProjectConfig } from '../configTypes.js';
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

  private async getUserConfig(): Promise<webpack.Configuration> {
    let webpackConfig: webpack.Configuration = {};
    const vueWebpackToolConfigPath = path.resolve(process.cwd(), 'vue-webpack-tool.config.mjs');
    if (fs.existsSync(vueWebpackToolConfigPath)) {
      const userConfig = (await import(vueWebpackToolConfigPath)) as ProjectConfig;
      const { publicPath, outputDir, devServer } = userConfig;

      const tmpWebpackConfig: webpack.Configuration = {};
      if (publicPath) {
        tmpWebpackConfig.output = {
          publicPath: userConfig.publicPath,
        };
      }
      if (outputDir) {
        tmpWebpackConfig.output = {
          path: outputDir,
        };
      }
      if (devServer) {
        tmpWebpackConfig.devServer = devServer;
      }

      webpackConfig = merge(userConfig.configureWebpack || {}, tmpWebpackConfig);
    }

    return webpackConfig;
  }

  async getWebpackDevConfig(options?: { dll?: boolean; lazy?: boolean }): Promise<webpack.Configuration> {
    const useConfig = await this.getUserConfig();

    return merge(
      webpackCommonConfig({
        outputDir: this.outputDir,
        dllManifestPath: this.dllManifestPath,
        dllDirectory: this.dllDirectory,
        dll: options?.dll,
      }),
      webpackDevConfig({
        outputDir: this.outputDir,
        cacheDirectory: this.cacheDirectory,
        lazy: options?.lazy,
      }),
      useConfig
    );
  }

  async getWebpackProdConfig(options?: { dll?: boolean }): Promise<webpack.Configuration> {
    const useConfig = await this.getUserConfig();

    return merge(
      webpackCommonConfig({
        outputDir: this.outputDir,
        dllManifestPath: this.dllManifestPath,
        dllDirectory: this.dllDirectory,
        dll: options?.dll,
      }),
      webpackProdConfig(),
      useConfig
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
