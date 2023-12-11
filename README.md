# @unify-js/vue-webpack-tool

A super fast build tool based webpack for vue project.

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
