# @unify-js/vue-webpack-tool

## 0.4.0

### Minor Changes

- 3a2fd96: utilize 'HtmlInjectDllPlugin' to copy all dll files to the output folder

## 0.3.0

### Minor Changes

- 1be8f84: support using DLL
- d4c3763: write the plugin to inject dll files into the html file
- 2ca42f9: supporting DLL files for both development and production environments.
- c80b3c4: The clear command supports cleaning the output and DLL folders.
- bc031b1: add "clear" command

### Patch Changes

- c44be25: Refactor the code using TypeScript.

## 0.2.2

### Patch Changes

- 8a76e4c: configure cache

## 0.2.1

### Patch Changes

- cfb9112: modify "devServer.static"
- 299861d: change "devtool" from "inline-source-map" to "eval-source-map"

## 0.2.0

### Minor Changes

- 064bf41: Use built-in asset modules to load images

## 0.1.0

### Minor Changes

- 08d1eca: define the "build" command
- 5f8c03a: configure caching

### Patch Changes

- 7661221: Configure resolve.extensions to support resolving both ts and tsx files.
- 67743d7: Extract the esbuild loader configuration and the CSS style loader configuration.
- b7cfa5b: configure "experiments.lazyCompilation" in dev mode
- 129713f: Dev mode supports single-page applications.
- be9e500: modify the "resolve.extensions"
- 0c7131a: use commander to define the dev command
- 97b71fd: modify output path to the "dist" folder of current working directory
