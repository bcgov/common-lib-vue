import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component, {
  intValidator,
  floatValidator,
  positiveNumberValidator,
  negativeNumberValidator,
} from '../../../src/components/NumberInput.vue';

const localVue = createLocalVue();

describe('NumberInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('Number validators', () => {
  it('intValidator', () => {
    expect(intValidator(123)).toBe(true);
    expect(intValidator('123')).toBe(true);
    expect(intValidator(-123)).toBe(true);
    expect(intValidator('-123')).toBe(true);
    expect(intValidator(123.123)).toBe(false);
    expect(intValidator('123.123')).toBe(false);
    expect(intValidator(-123.123)).toBe(false);
    expect(intValidator('-123.123')).toBe(false);
    expect(intValidator(undefined)).toBe(false);
    expect(intValidator(null)).toBe(false);
    expect(intValidator(NaN)).toBe(false);
  });

  it('floatValidator', () => {
    expect(floatValidator(123)).toBe(false);
    expect(floatValidator('123')).toBe(false);
    expect(floatValidator(-123)).toBe(false);
    expect(floatValidator('-123')).toBe(false);
    expect(floatValidator(123.123)).toBe(true);
    expect(floatValidator('123.123')).toBe(true);
    expect(floatValidator(-123.123)).toBe(true);
    expect(floatValidator('-123.123')).toBe(true);
    expect(floatValidator(undefined)).toBe(false);
    expect(floatValidator(null)).toBe(false);
    expect(floatValidator(NaN)).toBe(false);
  });

  it('positiveNumberValidator', () => {
    expect(positiveNumberValidator(123)).toBe(true);
    expect(positiveNumberValidator('123')).toBe(true);
    expect(positiveNumberValidator(-123)).toBe(false);
    expect(positiveNumberValidator('-123')).toBe(false);
    expect(positiveNumberValidator(123.123)).toBe(true);
    expect(positiveNumberValidator('123.123')).toBe(true);
    expect(positiveNumberValidator(-123.123)).toBe(false);
    expect(positiveNumberValidator('-123.123')).toBe(false);
    expect(positiveNumberValidator(undefined)).toBe(false);
    expect(positiveNumberValidator(null)).toBe(false);
    expect(positiveNumberValidator(NaN)).toBe(false);
  });

  it('negativeNumberValidator', () => {
    expect(negativeNumberValidator(123)).toBe(false);
    expect(negativeNumberValidator('123')).toBe(false);
    expect(negativeNumberValidator(-123)).toBe(true);
    expect(negativeNumberValidator('-123')).toBe(true);
    expect(negativeNumberValidator(123.123)).toBe(false);
    expect(negativeNumberValidator('123.123')).toBe(false);
    expect(negativeNumberValidator(-123.123)).toBe(true);
    expect(negativeNumberValidator('-123.123')).toBe(true);
    expect(negativeNumberValidator(undefined)).toBe(false);
    expect(negativeNumberValidator(null)).toBe(false);
    expect(negativeNumberValidator(NaN)).toBe(false);
  });
});
