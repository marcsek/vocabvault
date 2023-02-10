import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: [{ find: '@ui', replacement: path.resolve(__dirname, 'src/components/ui') }],
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3001,
  },
  plugins: [react()],
});
