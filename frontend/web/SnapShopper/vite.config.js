import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 //import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://test.api.snappshopper.com',
        changeOrigin: true,
        rewrite: (path) => `/api/routes${path.replace(/^\/api/, '')}`,
        logLevel: 'debug', 
      },
    },
  },
})
