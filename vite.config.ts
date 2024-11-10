import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', 'lucide-react/dist/esm/icons/fingerprint'],
  },
  server: {
    fs: {
      strict: false // This might help with serving static files
    }
  }
});
