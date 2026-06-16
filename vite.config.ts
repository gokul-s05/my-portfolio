import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://gokul-s-portfolio.vercel.app',
      dynamicRoutes: [
        '/',
        '/about',
        '/projects',
        '/skills',
        '/contact',
        '/resume',
        '/articles',
        '/coding-profiles'
      ]
    })
  ],
  server: {
    host: "::",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});