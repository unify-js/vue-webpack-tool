import fs from 'node:fs';
import ora from 'ora';

import type webpack from 'webpack';

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

export function clearDllFiles(dllDirectory: string) {
  clearDir({ dir: dllDirectory, startMessage: 'clearing old DLL files...', endMessage: 'old dll files cleared!' });
}

export function clearCacheFiles(cacheDirectory: string) {
  clearDir({
    dir: cacheDirectory,
    startMessage: 'clearing old cache files...',
    endMessage: 'old cache files cleared!',
  });
}

export function clearOutputFiles(projectOutputDirectory: string) {
  clearDir({
    dir: projectOutputDirectory,
    startMessage: 'clearing old output files...',
    endMessage: 'old output files cleared!',
  });
}
