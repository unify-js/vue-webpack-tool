# Get Started

## Installation

```bash
npm install @unify-js/vue-webpack-tool --save-dev
```

## index.html

Vue Webpack Tool searches for the `index.html` file in the project's root directory as the HTML template. Please ensure that an `index.html` file exists in the root directory of the project.

`index.html` example:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue3 Project</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

## Command Line Interface

After installing Vue Webpack Tool, you will have access to the `vue-webpack-tool` command in your npm script:

```json
{
  "scripts": {
    "dev": "vue-webpack-tool start", // start dev server
    "build": "vue-webpack-tool build", // build for production
    "dll": "vue-webpack-tool dll", // generate dll files
    "clear": "vue-webpack-tool clear" // clear all generated files
  }
}
```

For a full list of CLI options, run `npx vue-webpack-tool --help`.

Learn more about the [Command Line Interface](./cli.md)
