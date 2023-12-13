import path from 'node:path';
import fs from 'node:fs';

export const cacheDirectory = path.resolve(process.cwd(), '.temp_cache');
export const outputDirectory = path.resolve(process.cwd(), 'dist');
export const dllManifestPath = path.resolve(outputDirectory, 'vendor-manifest.json');

export const projectPackageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')) as {
  version: string;
  dependencies: Record<string, string>;
};
