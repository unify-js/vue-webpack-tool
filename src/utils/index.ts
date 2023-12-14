import path from 'node:path';
import fs from 'node:fs';
import ora from 'ora';

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

export function clearDir(options: { dir: string; startMessage: string; successMessage: string }) {
  const { dir, startMessage, successMessage } = options;

  const spinner = ora(startMessage).start();
  fs.rmSync(dir, { force: true, recursive: true });
  spinner.succeed(successMessage);
}
