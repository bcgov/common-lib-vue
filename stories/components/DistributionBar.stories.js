import DistributionBar from '../../src/components/DistributionBar.vue';

export default {
  title: 'Components/DistributionBar',
  component: DistributionBar,
  argTypes: {},
};

const Template = (args) => ({
  components: { DistributionBar, },
  setup() { return { args, } },
  data: () => ({
    value: null,
  }),
  template: '<DistributionBar v-bind="args" v-model="value" />',
});

export const Example3Items = Template.bind({});
Example3Items.args = {
  startingLabel: '$0',
  items: [
    {
      color: '#036',
      barLabel: '$200',
      label: 'First tier coverage.',
    },
    {
      color: '#f3cd65',
      barLabel: '$400',
      label: 'Second tier coverage. Filler content here. Filler content here. Filler content here. Filler content here. Filler content here. Filler content here. Filler content here. Filler content here. Filler content here.',
    },
    {
      color: '#486446',
      barLabel: '&infin;',
      label: 'Third tier coverage.',
    },
  ],
};

export const Example2Items = Template.bind({});
Example2Items.args = {
  startingLabel: '$0',
  items: [
    {
      color: '#036',
      barLabel: '$200',
      label: 'First tier coverage.',
    },
    {
      color: '#f3cd65',
      barLabel: '$400',
      label: 'Second tier coverage.',
    },
  ],
};
