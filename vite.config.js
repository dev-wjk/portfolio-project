// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "static/survey-form": resolve(
          __dirname,
          "static/survey-form/index.html"
        ),
        "static/tribute-page": resolve(
          __dirname,
          "static/tribute-page/index.html"
        ),
        "static/technical-doc": resolve(
          __dirname,
          "static/technical-doc/index.html"
        ),
        "static/product-landing-page": resolve(
          __dirname,
          "static/product-landing-page/index.html"
        ),
      },
    },
  },
});
