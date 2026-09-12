const eslint = require("@eslint/js");
const prettier = require("eslint-config-prettier");
const globals = require("globals");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");

const jsxFilename = {
  rules: {
    "jsx-extension": {
      meta: {
        type: "suggestion",
        messages: {
          useJsxExtension: "Files containing JSX must use the .jsx extension.",
        },
      },
      create(context) {
        return {
          JSXElement(node) {
            if (!context.filename.endsWith(".jsx")) {
              context.report({ node, messageId: "useJsxExtension" });
            }
          },
          JSXFragment(node) {
            if (!context.filename.endsWith(".jsx")) {
              context.report({ node, messageId: "useJsxExtension" });
            }
          },
        };
      },
    },
  },
};

module.exports = [
  {
    ignores: ["build/**", "node_modules/**"],
  },
  eslint.configs.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-filename": jsxFilename,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "jsx-filename/jsx-extension": "error",
      // React 19 removed runtime propTypes checking, so declaring propTypes is
      // dead code. Disabled deliberately rather than worked around per file.
      "react/prop-types": "off",
    },
  },
  {
    files: ["*.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  prettier,
];
