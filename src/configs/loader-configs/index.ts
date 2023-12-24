import type { Options } from './types.js';
import esbuild from './esbuild.js';
import styleLoaderConfigs from './style.js';
import asset from './asset.js';

export default function loaderConfigs(options: Options) {
  return [...esbuild, ...styleLoaderConfigs(options), ...asset(options)];
}
