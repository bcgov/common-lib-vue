/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "storybook-addon-mock",
  ],

  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },

  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },

  docs: {},
};
export default config;
