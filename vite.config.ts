import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/chess-typescript-react/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
