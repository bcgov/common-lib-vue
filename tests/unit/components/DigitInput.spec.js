import { mount } from '@vue/test-utils';
import DigitInput, {
  digitValidator
} from '../../../src/components/DigitInput.vue';

describe('DigitInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(DigitInput);
    expect(wrapper.element).toBeDefined();
  });

  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { 
          digit: "1",
        };
      },
      template: '<div><DigitInput v-model="digit" /></div>',
      components: { DigitInput, },
    });
    const input = wrapper.find('input');
    expect(input.element.value).toBe("1");

    input.setValue("42")
    expect(wrapper.vm.digit).toBe("42");
  });

});

describe('Validators', () => {
  it('digitValidator', () => {
    expect(digitValidator('123')).toBe(true);
    expect(digitValidator(123)).toBe(true);
    expect(digitValidator('0')).toBe(true);
    expect(digitValidator('123.0')).toBe(false);
    expect(digitValidator('123.456')).toBe(false);
    expect(digitValidator(123.456)).toBe(false);
    expect(digitValidator('')).toBe(false);
    expect(digitValidator(undefined)).toBe(false);
    expect(digitValidator(null)).toBe(false);
    expect(digitValidator(NaN)).toBe(false);
  });
});

describe('NumberInput getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(DigitInput, {
      props: {
        cypressId: 'potato',
      },
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});
