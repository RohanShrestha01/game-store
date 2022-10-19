import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) {
            if (id.includes('@mui')) return 'vendor_mui';
            else if (id.includes('swiper')) return 'vendor_swiper';
            return 'vendor';
          }
        },
      },
    },
  },
});
