// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginImportHelpers from "eslint-plugin-import-helpers"

export default tseslint.config(
  {
    ignores: ["node_modules", "eslint.config.mjs", "*.json"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "import-helpers": eslintPluginImportHelpers
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: "tsconfig.json",
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module",
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "import-helpers/order-imports": [
        "warn",
        {
          "newlinesBetween": "always",
          "groups": [
            "module",
            "/^@\\//",
            [
              "parent",
              "sibling"
            ],
            "index"
          ],
          "alphabetize": {
            "order": "asc",
            "ignoreCase": true
          }
        }
      ],
    },
  },
);
