import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://test.api.snappshopper.com",
        changeOrigin: true,
        //rewrite: (path) => `/api/routes${path.replace(/^\/api/, '')}`,
        rewrite: (path) => path.replace(/^\/api/, '/api/routes'),
        //  rewrite: (path) => {
        //   console.log('Rewriting path:', path);
        //   console.log(path.replace(/^\/api/, '/api/routes'))
        //   return path.replace(/^\/api/, '/api/routes');
        // },
        logLevel: "debug",
      },
    },
  },
});
