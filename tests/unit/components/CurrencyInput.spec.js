import { mount } from '@vue/test-utils';
import CurrencyInput from '../../../src/components/CurrencyInput.vue';

describe('CurrencyInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(CurrencyInput);
    expect(wrapper.element).toBeDefined();
  });

  it('removeLeadingZeros() removes leading zeros', () => {
    const wrapper = mount(CurrencyInput);
    expect(wrapper.vm.removeLeadingZeros('0')).toBe('0');
    expect(wrapper.vm.removeLeadingZeros('00')).toBe('0');
    expect(wrapper.vm.removeLeadingZeros('000')).toBe('0');
    expect(wrapper.vm.removeLeadingZeros('1')).toBe('1');
    expect(wrapper.vm.removeLeadingZeros('1234')).toBe('1234');
    expect(wrapper.vm.removeLeadingZeros('01234')).toBe('1234');
    expect(wrapper.vm.removeLeadingZeros('001234')).toBe('1234');
    expect(wrapper.vm.removeLeadingZeros('0001234')).toBe('1234');
    expect(wrapper.vm.removeLeadingZeros('-1234')).toBe('-1234');
    expect(wrapper.vm.removeLeadingZeros('-01234')).toBe('-1234');
    expect(wrapper.vm.removeLeadingZeros('-001234')).toBe('-1234');
    expect(wrapper.vm.removeLeadingZeros('-0001234')).toBe('-1234');
    expect(wrapper.vm.removeLeadingZeros('0.12')).toBe('0.12');
    expect(wrapper.vm.removeLeadingZeros('.12')).toBe('0.12');
    expect(wrapper.vm.removeLeadingZeros('00.12')).toBe('0.12');
    expect(wrapper.vm.removeLeadingZeros('000.12')).toBe('0.12');
    expect(wrapper.vm.removeLeadingZeros('-000.12')).toBe('-0.12');
    expect(wrapper.vm.removeLeadingZeros('000123.12')).toBe('123.12');
    expect(wrapper.vm.removeLeadingZeros('-000123.12')).toBe('-123.12');
    expect(wrapper.vm.removeLeadingZeros('')).toBe('');
    expect(wrapper.vm.removeLeadingZeros(undefined)).toBe(undefined);
    expect(wrapper.vm.removeLeadingZeros(null)).toBe(null);
    expect(wrapper.vm.removeLeadingZeros(NaN)).toBe(NaN);
  });
});

describe('NumberInput getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(CurrencyInput, {
      props: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});

describe("CurrencyInput event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { currency: "11" };
      },
      template: '<div><CurrencyInput v-model="currency" /></div>',
      components: { CurrencyInput },
    });

    expect(wrapper.vm.currency).toBe("11");
    const baseInput = wrapper.find("input");
    await baseInput.setValue("1111");

    // Model value is unformatted
    expect(wrapper.vm.currency).toBe("1111");

    // Displayed value is formatted
    expect(baseInput.element.value).toBe("1,111")
  });
});
