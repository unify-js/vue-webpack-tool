import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { Options } from './types.js';

export default function styleLoaderConfig(options: Options) {
  return [
    {
      test: /\.css$/,
      oneOf: [
        // this matches `<style module>`
        {
          resourceQuery: /module/,
          use: [
            options.isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]_[hash:base64]',
                },
              },
            },
          ],
        },
        // this matches plain `<style>` or `<style scoped>`
        {
          use: ['style-loader', 'css-loader'],
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
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]_[hash:base64]',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          use: ['style-loader', 'css-loader', 'sass-loader'],
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
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]_[hash:base64]',
                },
              },
            },
            'less-loader',
          ],
        },
        {
          use: ['style-loader', 'css-loader', 'less-loader'],
        },
      ],
    },
  ];
}
