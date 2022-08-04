import AddressDoctorInput from '../../src/components/AddressDoctorInput.vue';
import withMock from 'storybook-addon-mock';

const baseApiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:6006' : 'https://bcgov.github.io'

export default {
  title: 'Components/AddressDoctorInput',
  component: AddressDoctorInput,
  argTypes: {},
  decorators: [
    withMock,
  ],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  components: { AddressDoctorInput },
  setup() { return { args, } },
  data: () => ({
    value: null,
  }),
  template: '<AddressDoctorInput v-bind="$props" v-model="value" serviceUrl="/address"/>',
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Label:',
};
Example.parameters = {
  mockData: [
    {
      url: `${baseApiUrl}/address?address`,
      method: 'GET',
      status: 200,
      response: {
        Address: [
          {
            Organization: '',
            Contact: '',
            Building: '',
            SubBuilding: '',
            Street: 'YATES DR',
            HouseNumber: '716',
            DeliveryService: '',
            Locality: 'MILTON',
            PostalCode: 'L9T 7R5',
            Province: 'ON',
            Country: 'CANADA',
            Residue: '',
            DeliveryAddressLines: '716 YATES DR',
            AddressLines: [
              '716 YATES DR',
            ],
            AddressComplete: '716 YATES DR MILTON ON L9T 7R5',
          },
        ],
      },
    },
  ],
}
