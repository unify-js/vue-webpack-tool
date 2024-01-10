import type { UserConfigInterface } from '../../configTypes.js';

export interface Options {
  isProduction: boolean;
  assetsDir: string;
  css?: UserConfigInterface['css'];
}
