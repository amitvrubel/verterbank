import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@verterbank/messages': path.resolve(__dirname, '../../packages/messages/src/index.ts'),
      '@verterbank/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
    },
  },
});
