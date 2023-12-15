import path from 'node:path';
import fs from 'node:fs';
import ora from 'ora';
import type webpack from 'webpack';

const contextDirectory = process.cwd();

export const projectOutputDirectory = path.resolve(contextDirectory, 'dist');

export const tempDirectory = path.resolve(contextDirectory, '.temp');
export const cacheDirectory = path.resolve(tempDirectory, '.temp_cache');
export const dllDirectory = path.resolve(tempDirectory, '.dll');
export const dllManifestPath = path.resolve(dllDirectory, 'vendor-manifest.json');

export const projectPackageJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')) as {
  version: string;
  dependencies: Record<string, string>;
};

export function displayInfo(err: Error | undefined, stats: webpack.Stats | undefined) {
  // https://webpack.js.org/api/node/#error-handling

  // The err object will only contain webpack-related issues, such as misconfiguration
  if (err) {
    console.error(err.stack || err);

    return;
  }

  if (stats) {
    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log(stats.toString());
  }
}

function clearDir(options: { dir: string; startMessage: string; endMessage: string }) {
  const { dir, startMessage, endMessage } = options;

  const spinner = ora(startMessage).start();
  fs.rmSync(dir, { force: true, recursive: true });
  spinner.succeed(endMessage);
}

export function clearDllFiles() {
  clearDir({ dir: dllDirectory, startMessage: 'clearing old DLL files...', endMessage: 'old dll files cleared!' });
}

export function clearCacheFiles() {
  clearDir({
    dir: cacheDirectory,
    startMessage: 'clearing old cache files...',
    endMessage: 'old cache files cleared!',
  });
}

export function clearOutputFiles() {
  clearDir({
    dir: projectOutputDirectory,
    startMessage: 'clearing old output files...',
    endMessage: 'old output files cleared!',
  });
}
