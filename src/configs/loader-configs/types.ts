import type { UserConfig } from '../../configTypes.js';

export interface Options {
  isProduction: boolean;
  assetsDir: string;
  css?: UserConfig['css'];
}
