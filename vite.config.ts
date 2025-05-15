import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add buffer polyfill
      buffer: "buffer",
      "buffer/": "buffer/",
    },
  },
  define: {
    // Handle process.env for libraries that depend on it
    "process.env": {},
    // Define global Buffer for plotly.js
    global: "globalThis",
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser GlobalThis
      define: {
        global: "globalThis",
      },
    },
  },
});
