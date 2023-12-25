import type { ProjectConfig } from '../../configTypes.js';

export interface Options {
  isProduction: boolean;
  assetsDir: string;
  css?: ProjectConfig['css'];
}
