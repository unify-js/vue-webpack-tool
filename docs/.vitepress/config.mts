import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Webpack Tool',
  description: 'A webpack-based build tool for Vue development that focuses on the build performance.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Guides', link: '/why-vue-webpack-tool', activeMatch: '/guide/' }],

    sidebar: [
      {
        text: 'Guides',
        items: [
          { text: 'Why Vue Webpack Tool', link: '/guide/why-vue-webpack-tool' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'CLI', link: '/guide/cli' },
          { text: 'Config', link: '/guide/configuration' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/unify-js/vue-webpack-tool' }],

    outline: {
      level: 'deep',
    },
  },
});
