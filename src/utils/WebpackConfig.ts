import type webpack from 'webpack';
import path from 'node:path';
import fs from 'node:fs';
import { merge } from 'webpack-merge';

import type { ProjectConfig } from '../configTypes.js';
import { webpackCommonConfig, webpackDevConfig, webpackProdConfig, webpackDllConfig } from '../configs/index.js';

export default class WebpackConfig {
  contextDirectory = process.cwd();
  outputDir = path.resolve(this.contextDirectory, 'dist');
  tempDirectory = path.resolve(this.contextDirectory, '.temp');
  cacheDirectory = path.resolve(this.tempDirectory, '.temp_cache');
  dllDirectory = path.resolve(this.tempDirectory, '.dll');
  dllManifestPath = path.resolve(this.dllDirectory, 'vendor-manifest.json');
  publicPath = '/';
  projectPackageJson: {
    version: string;
    dependencies: Record<string, string>;
  };
  assetsDir = '';

  constructor() {
    this.projectPackageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')) as {
      version: string;
      dependencies: Record<string, string>;
    };
  }

  private async getUserConfig(): Promise<webpack.Configuration> {
    let webpackConfig: webpack.Configuration = {};
    const vueWebpackToolConfigPath = path.resolve(process.cwd(), 'vue-webpack-tool.config.mjs');
    if (fs.existsSync(vueWebpackToolConfigPath)) {
      const { default: userConfig } = (await import(vueWebpackToolConfigPath)) as {
        default: ProjectConfig;
      };
      const { publicPath, outputDir, devServer, assetsDir } = userConfig;

      const tmpWebpackConfig: webpack.Configuration = {};
      if (publicPath) {
        this.publicPath = publicPath;
        tmpWebpackConfig.output = {
          publicPath: userConfig.publicPath,
        };
      }
      if (outputDir) {
        this.outputDir = outputDir;
        tmpWebpackConfig.output = {
          path: outputDir,
        };
      }
      if (devServer) tmpWebpackConfig.devServer = devServer;
      if (assetsDir) this.assetsDir = assetsDir;

      webpackConfig = merge(userConfig.configureWebpack || {}, tmpWebpackConfig);
    }

    return webpackConfig;
  }

  async getWebpackDevConfig(options?: {
    dll?: boolean;
    lazy?: boolean;
    assetsDir?: string;
  }): Promise<webpack.Configuration> {
    const useConfig = await this.getUserConfig();

    return merge(
      webpackCommonConfig({
        outputDir: this.outputDir,
        dllManifestPath: this.dllManifestPath,
        dllDirectory: this.dllDirectory,
        dll: options?.dll,
        publicPath: this.publicPath,
        isProduction: false,
        assetsDir: this.assetsDir,
      }),
      webpackDevConfig({
        outputDir: this.outputDir,
        cacheDirectory: this.cacheDirectory,
        lazy: options?.lazy,
        publicPath: this.publicPath,
      }),
      useConfig
    );
  }

  async getWebpackProdConfig(options?: { dll?: boolean; assetsDir?: string }): Promise<webpack.Configuration> {
    const useConfig = await this.getUserConfig();

    return merge(
      webpackCommonConfig({
        outputDir: this.outputDir,
        dllManifestPath: this.dllManifestPath,
        dllDirectory: this.dllDirectory,
        dll: options?.dll,
        publicPath: this.publicPath,
        isProduction: true,
        assetsDir: this.assetsDir,
      }),
      webpackProdConfig({ assetsDir: this.assetsDir }),
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
