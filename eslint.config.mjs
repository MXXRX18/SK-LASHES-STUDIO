import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ["**/*.tsx"], plugins: { "react-hooks": reactHooks }, rules: reactHooks.configs.recommended.rules },
  globalIgnores([".next/**", "out/**", "next-env.d.ts"])
]);
