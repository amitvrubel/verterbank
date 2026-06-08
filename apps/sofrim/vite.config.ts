import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@verterbank/messages': resolve(__dirname, '../../packages/messages/src/index.ts'),
      '@verterbank/ui': resolve(__dirname, '../../packages/ui/src/index.ts'),
    },
  },
  server: {
    port: 5174,
  },
});
