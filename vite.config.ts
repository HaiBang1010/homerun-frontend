import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  build: {
    
    rolldownOptions: {
      output: {
        // Split the large, rarely-changing deps out of the entry so a deploy that
        // only touches app code does not invalidate them. index.html preloads these,
        // so they download in parallel — this adds no request waterfall.
        advancedChunks: {
          groups: [
            { name: "react", test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: "router", test: /node_modules[\\/]react-router/ },
            { name: "query", test: /node_modules[\\/](@tanstack|axios)[\\/]/ },
            { name: "radix", test: /node_modules[\\/](radix-ui|@radix-ui)[\\/]/ },
          ],
        },
      },
    },
  },
});
