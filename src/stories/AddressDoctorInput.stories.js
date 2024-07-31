import AddressDoctorInput from "@/components/AddressDoctorInput.vue";

const baseApiUrl = "http://localhost:6006";

export default {
  title: "Components/AddressDoctorInput",
  component: AddressDoctorInput,
  argTypes: {},
};

const Template = (args) => ({
  components: { AddressDoctorInput },
  setup() {
    return { args };
  },
  data: () => ({
    value: null,
  }),
  template: '<AddressDoctorInput v-bind="args" v-model="value" serviceUrl="/address" />',
});

export const Example = Template.bind({});
Example.args = {
  label: "My Label:",
};
Example.parameters = {
  mockData: [
    {
      url: `${baseApiUrl}/address?address`,
      method: "GET",
      status: 200,
      response: {
        Address: [
          {
            Organization: "",
            Contact: "",
            Building: "",
            SubBuilding: "",
            Street: "YATES DR",
            HouseNumber: "716",
            DeliveryService: "",
            Locality: "MILTON",
            PostalCode: "L9T 7R5",
            Province: "ON",
            Country: "CANADA",
            Residue: "",
            DeliveryAddressLines: "716 YATES DR",
            AddressLines: ["716 YATES DR"],
            AddressComplete: "716 YATES DR MILTON ON L9T 7R5",
          },
        ],
      },
    },
  ],
};
