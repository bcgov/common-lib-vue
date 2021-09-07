import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component, {
  digitValidator,
} from '../../../src/components/DigitInput.vue';

const localVue = createLocalVue();

describe('DigitInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
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
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato]").exists()).toBe(true)
  });
});
