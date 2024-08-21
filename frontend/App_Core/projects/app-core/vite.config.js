import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  resolve: {
    alias: {
      '@core': '/path/to/travel-and-trek-app-core/src'
    }
  },
  plugins: [vue()]
});
