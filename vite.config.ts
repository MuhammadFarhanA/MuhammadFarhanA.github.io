import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spatial-prototype-route',
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          if (request.url === '/spatial-prototype' || request.url === '/spatial-prototype/')
            request.url = '/spatial-prototype/index.html';
          next();
        });
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        spatialPrototype: 'spatial-prototype/index.html',
      },
    },
  },
});
