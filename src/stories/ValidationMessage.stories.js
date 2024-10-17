import ValidationMessage from "../components/ValidationMessage.vue";

export default {
  title: "Components/ValidationMessage",
  component: ValidationMessage,
  argTypes: {
    type: {
      options: ["success", "error"],
      control: { type: "select" },
    },
  },
};

const text = `<p>Lorem ipsum dolor sit amet. Et quasi impedit sed cumque omnis aut neque quas aut laboriosam laborum aut praesentium excepturi sed vero odio vel sunt perspiciatis. Sed voluptas natus qui dolores error nam doloribus laborum. Qui natus voluptatem et laboriosam harum et quasi dolorem. Sed tempore reiciendis aut quas Quis aut nulla mollitia vel beatae obcaecati sit quam architecto sed iusto perferendis.</p>

<p>Hic quam laboriosam sit doloremque ducimus in dolorum omnis et itaque aperiam aut officia eaque. Est dicta voluptatem in rerum culpa eos velit impedit! Sit veritatis consequuntur ea dignissimos iusto eum sunt atque id quibusdam laudantium et voluptatem accusantium.</p>`;

const Template = (args) => ({
  components: { ValidationMessage },
  setup() {
    return { args };
  },
  template: `<ValidationMessage v-bind="args">${text}</ValidationMessage>`,
});

export const SuccessExample = Template.bind({});
SuccessExample.args = {
  type: "success",
};

export const ErrorExample = Template.bind({});
ErrorExample.args = {
  type: "error",
};
