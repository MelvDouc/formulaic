import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: "esm",
  minify: !options.watch
}));