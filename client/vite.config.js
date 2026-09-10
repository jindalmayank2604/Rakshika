import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Rakshika/',
  plugins: [react()],

  optimizeDeps: {
    exclude: ['maplibre-gl']
  },

  server: {
    port: 5173,
    host: true
  }
});
