import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/slideshow-card.js',
  output: {
    file: 'dist/slideshow-card.js',
    format: 'es',
    inlineDynamicImports: true,
    sourcemap: dev,
  },
  plugins: [
    resolve(),
    commonjs(),
    !dev && terser({ format: { comments: false } }),
  ].filter(Boolean),
};
