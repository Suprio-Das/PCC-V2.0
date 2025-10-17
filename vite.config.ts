import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@guards": path.resolve(__dirname, "./src/guards"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@validations": path.resolve(__dirname, "./src/validations"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
});
