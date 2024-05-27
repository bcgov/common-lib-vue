import Button from '../../src/components/Button.vue';
import PageStepper from '../../src/components/PageStepper.vue';

export default {
  title: 'Components/PageStepper',
  component: PageStepper,
  argTypes: {},
};

const Template = (args) => ({
  components: { PageStepper, },
  setup() { return { args, } },
  template: '<PageStepper v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  currentPath: '/page-c',
  routes: [
    {
      path: '/page-a',
      title: 'Page A',
    },
    {
      path: '/page-b',
      title: 'Page B',
    },
    {
      path: '/page-c',
      title: 'Page C',
    },
    {
      path: '/page-d',
      title: 'Page D',
    },
    {
      path: '/page-e',
      title: 'Page E',
    },
  ],
};

const scrollableExampleRoutes = [
  {
    path: '/page-a',
    title: 'Page A',
  },
  {
    path: '/page-b',
    title: 'Page B',
  },
  {
    path: '/page-c',
    title: 'Page C',
  },
  {
    path: '/page-d',
    title: 'Page D',
  },
  {
    path: '/page-e',
    title: 'Page E',
  },
  {
    path: '/page-f',
    title: 'Page F',
  },
  {
    path: '/page-g',
    title: 'Page G',
  },
  {
    path: '/page-h',
    title: 'Page H',
  },
  {
    path: '/page-i',
    title: 'Page I',
  },
  {
    path: '/page-j',
    title: 'Page J',
  },
  {
    path: '/page-k',
    title: 'Page K',
  },
  {
    path: '/page-l',
    title: 'Page L',
  },
  {
    path: '/page-m',
    title: 'Page M',
  },
];

const ScrollableTemplate = (args) => ({
  components: {
    Button,
    PageStepper,
  },
  data: () => {
    return {
      args,
    };
  },
  methods: {
    handleClickBack() {
      const currentIndex = this.routesCollection.findIndex((route) => route.path === this.currentPathStr);
      if (currentIndex > 0) {
        this.currentPathStr = this.routesCollection[currentIndex - 1].path;
      }
    },
    handleClickNext() {
      const currentIndex = this.routesCollection.findIndex((route) => route.path === this.currentPathStr);
      if (currentIndex < this.routesCollection.length - 1) {
        this.currentPathStr = this.routesCollection[currentIndex + 1].path;
      }
    },
  },
  template: `
  <div>
    <PageStepper v-bind="args" />
    <Button label="Back"
      @click="handleClickBack"/>
    <Button label="Next"
      @click="handleClickNext"/>
  </div>
  `,
});

export const ScrollableExample = ScrollableTemplate.bind({});
ScrollableExample.args = {
  routes: scrollableExampleRoutes,
  currentPath: '/page-c',
  minStepLabelWidth: 200,
}
