import ButtonComponent from "../../src/components/ButtonComponent.vue";
import PageStepper from "../../src/components/PageStepper.vue";

export default {
  title: "Components/PageStepper",
  component: PageStepper,
  argTypes: {},
};

const normalRoutes = [
  {
    path: "/page-a",
    title: "Page A",
  },
  {
    path: "/page-b",
    title: "Page B",
  },
  {
    path: "/page-c",
    title: "Page C",
  },
  {
    path: "/page-d",
    title: "Page D",
  },
  {
    path: "/page-e",
    title: "Page E",
  },
];

const scrollableExampleRoutes = [
  {
    path: "/page-a",
    title: "Page A",
  },
  {
    path: "/page-b",
    title: "Page B",
  },
  {
    path: "/page-c",
    title: "Page C",
  },
  {
    path: "/page-d",
    title: "Page D",
  },
  {
    path: "/page-e",
    title: "Page E",
  },
  {
    path: "/page-f",
    title: "Page F",
  },
  {
    path: "/page-g",
    title: "Page G",
  },
  {
    path: "/page-h",
    title: "Page H",
  },
  {
    path: "/page-i",
    title: "Page I",
  },
  {
    path: "/page-j",
    title: "Page J",
  },
  {
    path: "/page-k",
    title: "Page K",
  },
  {
    path: "/page-l",
    title: "Page L",
  },
  {
    path: "/page-m",
    title: "Page M",
  },
];

const Template = (args) => ({
  components: {
    ButtonComponent,
    PageStepper,
  },
  data: () => {
    return {
      args,
    };
  },
  methods: {
    handleClickBack() {
      const currentIndex = args.routes.findIndex((route) => route.path === args.currentPath);
      if (currentIndex > 0) {
        args.currentPath = args.routes[currentIndex - 1].path;
      }
    },
    handleClickNext() {
      const currentIndex = args.routes.findIndex((route) => route.path === args.currentPath);
      if (currentIndex < args.routes.length - 1) {
        args.currentPath = args.routes[currentIndex + 1].path;
      }
    },
  },
  template: `
      <div>
        <PageStepper v-bind="args" />
        <ButtonComponent label="Back"
          @click="handleClickBack"/>
        <ButtonComponent label="Next"
          @click="handleClickNext"/>
      </div>
      `,
});

export const Example = Template.bind({});
Example.args = {
  currentPath: "/page-c",
  routes: normalRoutes,
};

export const ScrollableExample = Template.bind({});
ScrollableExample.args = {
  currentPath: "/page-c",
  routes: scrollableExampleRoutes,
  minStepLabelWidth: 200,
};
