import { build } from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

build({
  entryPoints: ['./src/handlers/**'],
  bundle: true,
  minify: true,
  platform: 'node',
  sourcemap: false,
  outdir: './dist',
  entryNames: '[name]',
  target: 'esnext',
  format: 'cjs',
  loader: { '.ts': 'ts' },
  plugins: [esbuildPluginTsc()],
});
