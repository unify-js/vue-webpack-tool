import path from 'node:path';

import type { UserDefinePath } from '../configTypes.js';

export default class PathInfo {
  path: {
    outputDir: string;
    publicPath: string;
    assetsDir: string;

    tempDirectory: string;
    cacheDirectory: string;
    dllDirectory: string;
    dllManifestPath: string;
  };

  constructor(userDefinePath: UserDefinePath) {
    const contextDirectory = process.cwd();

    const tempDirectory = path.resolve(contextDirectory, '.temp');
    const cacheDirectory = path.resolve(tempDirectory, '.temp_cache');
    const dllDirectory = path.resolve(tempDirectory, '.dll');
    const dllManifestPath = path.resolve(dllDirectory, 'vendor-manifest.json');

    const outputDir = path.resolve(contextDirectory, 'dist');
    const publicPath = '/';
    const assetsDir = '';

    const keys = Object.keys(userDefinePath) as (keyof UserDefinePath)[];
    keys.forEach((key) => {
      if (!userDefinePath[key]) delete userDefinePath[key];
    });

    this.path = {
      outputDir,
      publicPath,
      assetsDir,
      ...userDefinePath,
      tempDirectory,
      cacheDirectory,
      dllDirectory,
      dllManifestPath,
    };
  }
}
