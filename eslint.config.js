import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    rules: {
      "prefer-const": "warn",
      "no-constant-binary-expression": "error",
    },
  },
]);
