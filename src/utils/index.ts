import path from 'node:path';
import fs from 'node:fs';

export const cacheDirectory = path.resolve(process.cwd(), '.temp_cache');
export const dllDirectory = path.resolve(process.cwd(), '.dll');
export const dllManifestPath = path.resolve(dllDirectory, 'vendors-manifest.json');
export const outputDirectory = path.resolve(process.cwd(), 'dist');

export const projectPackageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')) as {
  version: string;
  dependencies: Record<string, string>;
};
