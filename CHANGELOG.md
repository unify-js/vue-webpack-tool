# @unify-js/vue-webpack-tool

## 0.9.2

### Patch Changes

- 0b822e8: turn off path info in dev mode
- 4fc95d3: support resolve .vue extension

## 0.9.1

### Patch Changes

- b0cec7a: configure webpack resolve.alias

## 0.9.0

### Minor Changes

- f98d11b: support configuring loaders for CSS styles

## 0.8.0

### Minor Changes

- 62d7ce4: support configuring asset dir

## 0.7.0

### Minor Changes

- ffe3f42: support configuring public path

## 0.6.1

### Patch Changes

- 52cc836: Fix the issue of being unable to read the user configuration file
- 91428f0: modify the optimization config to improve build performance

## 0.6.0

### Minor Changes

- e5a6003: Users can quickly configure webpack using publicPath, outputDir, and devServer options.
- 717ba36: enable lazy compilation by passing the "--lazy" option when using the "start" command
- f5dc6e3: enable DLL by passing the "--dll" argument

### Patch Changes

- 5587536: modify the options for the "dll" command

## 0.5.0

### Minor Changes

- e42ddfa: The user can customize the webpack config using the vue-webpack-tool.config.js file

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
