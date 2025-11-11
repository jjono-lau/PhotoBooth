import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages hosts the site at /PhotoBooth/, so we only adjust the base path on build.
const repoBasePath = "/PhotoBooth/";

export default defineConfig(({ command }) => ({
  base: command === "build" ? repoBasePath : "/",
  plugins: [react(), tailwindcss()],
}));
