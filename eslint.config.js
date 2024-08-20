import js from "@eslint/js";
import pluginCypress from "eslint-plugin-cypress/flat";
import compat from "eslint-plugin-compat";
import pluginVue from "eslint-plugin-vue";

export default [
  js.configs.recommended, //eslint formatting for basic Javascript syntax
  pluginCypress.configs.globals, //eslint formatting for Cypress syntax
  ...pluginVue.configs["flat/recommended"], //eslint formatting for Vue components
  compat.configs["flat/recommended"], //compatibility with browsers listed in package.json
  {
    files: ["**/*.js", "**/*.vue", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
    },
    rules: {
      "no-unused-vars": "warn",
      //rules disabled to work better with prettier
      "vue/singleline-html-element-content-newline": "off",
      "vue/html-self-closing": "off",
      "vue/html-indent": "off",
    },
  },
  {
    files: ["**/*.spec.js", "vitest.config.js"], //disable browser compatability check in unit tests
    rules: {
      "compat/compat": "off",
    },
  },
  {
    ignores: ["**/coverage/*", "**/dist/*"],
  },
];
