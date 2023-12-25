import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { Options } from './types.js';

export default function styleLoaderConfig(options: Options) {
  const cssLoaderConfig = {
    loader: 'css-loader',
    options: Object.assign({}, options.css?.loaderOptions?.css),
  };

  const cssModuleLoaderConfig = {
    loader: 'css-loader',
    options: Object.assign(
      {
        modules: {
          localIdentName: '[local]_[hash:base64]',
        },
      },
      options.css?.loaderOptions?.css
    ),
  };

  const lessLoaderConfigs = {
    loader: 'less-loader',
    options: Object.assign({}, options.css?.loaderOptions?.less),
  };

  const sassLoaderConfigs = {
    loader: 'sass-loader',
    options: Object.assign({}, options.css?.loaderOptions?.sass),
  };

  return [
    {
      test: /\.css$/,
      oneOf: [
        // this matches `<style module>`
        {
          resourceQuery: /module/,
          use: [options.isProduction ? MiniCssExtractPlugin.loader : 'style-loader', cssModuleLoaderConfig],
        },
        // this matches plain `<style>` or `<style scoped>`
        {
          use: ['style-loader', cssLoaderConfig],
        },
      ],
    },

    {
      test: /\.scss$/,
      oneOf: [
        {
          resourceQuery: /module/,
          use: [
            options.isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            cssModuleLoaderConfig,
            sassLoaderConfigs,
          ],
        },
        {
          use: ['style-loader', cssLoaderConfig, sassLoaderConfigs],
        },
      ],
    },

    {
      test: /\.less$/,
      oneOf: [
        {
          resourceQuery: /module/,
          use: [
            options.isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            cssModuleLoaderConfig,
            lessLoaderConfigs,
          ],
        },
        {
          use: ['style-loader', cssLoaderConfig, lessLoaderConfigs],
        },
      ],
    },
  ];
}
