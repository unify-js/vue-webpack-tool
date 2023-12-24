import path from 'node:path';

import type { Options } from './types.js';

export default function assetsLoaderConfig(options: Options) {
  return [
    {
      test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
      type: 'asset/resource',
      generator: {
        filename: path.join(options.assetsDir, 'images/[hash][ext][query]'),
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: path.join(options.assetsDir, 'fonts/[hash][ext][query]'),
      },
    },
  ];
}
