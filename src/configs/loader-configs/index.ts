import esbuild from './esbuild.js';
import style from './style.js';
import asset from './asset.js';

export default [...esbuild, ...style, ...asset];
