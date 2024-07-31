/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // '@chromatic-com/storybook',
    // '@storybook/addon-interactions',
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
