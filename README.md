# @unify-js/vue-webpack-tool

A webpack-based build tool for Vue development that focuses on the build performance.

## Motivation

Currently, Vite is the official build tool for Vue projects, while the webpack-based build tool, vue-cli-service, is now in a maintenance state. This implies that new features related to webpack will not be added to vue-cli-service, especially those that focus on build performance. Many existing Vue projects still use vue-cli-service, but the build performance is not satisfactory. Moreover, migrating to Vite involves significant effort due to historical reasons. Hence, the aim of this project is to offer improved build performance to Vue projects that were originally based on vue-cli-service or webpack, with a lower migration cost.

## Usage

1. Install

```bash
npm install @unify-js/vue-webpack-tool --save-dev
```

2. Modify npm scripts:

```json
{
  "scripts": {
    "dev": "vue-webpack-tool dev",
    "build": "vue-webpack-tool build"
  }
}
```

3. Add `index.html` inside the root directory of your project:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue3</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

4. Add `src/main.js`:

```js
import { createApp } from "vue";

import App from "./App.vue";

createApp(App).mount("#app");
```

Tips: The demo of vue3 project is inside the `playground` directory.
