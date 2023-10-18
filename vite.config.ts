import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  build: {
    minify: true,
    cssMinify: true,
  },
});
