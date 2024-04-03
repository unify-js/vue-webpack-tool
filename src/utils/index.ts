import fs from 'node:fs';
import ora from 'ora';

import type webpack from 'webpack';

export function displayInfo(err: Error | null, stats: webpack.Stats | undefined) {
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

export function clearOldFiles(tempDirectory: string) {
  clearDir({ dir: tempDirectory, startMessage: 'clearing old files...', endMessage: 'old files cleared!' });
}

export function clearDllFiles(dllDirectory: string) {
  clearDir({ dir: dllDirectory, startMessage: 'clearing old DLL files...', endMessage: 'old dll files cleared!' });
}
