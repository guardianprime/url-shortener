import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:8000",
      "/login": "http://localhost:8000",
      "/signup": "http://localhost:8000",
      "/logout": "http://localhost:8000",
      "/me": "http://localhost:8000",
      "/shorten": "http://localhost:8000",
    },
  },
});
