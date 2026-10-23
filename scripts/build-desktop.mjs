import { build } from 'esbuild';
import { build as buildClient } from 'vite';

process.env.NODE_ENV = 'production';
await buildClient();
await build({ entryPoints: ['server/_core/index.ts'], platform: 'node', packages: 'external', bundle: true,
  format: 'esm', outdir: 'dist', external: ['./vite'] });
