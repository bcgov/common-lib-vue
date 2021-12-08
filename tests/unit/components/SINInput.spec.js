import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component, {
  sinValidator,
} from '../../../src/components/SINInput.vue';

const localVue = createLocalVue();

describe('SINInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('PhnInput getCypressValue()', () => {
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

describe('sinValidator', () => {
  it('returns expected result', () => {
    expect(sinValidator('123456782')).toBe(true);
    expect(sinValidator('123 456 782')).toBe(true);
    expect(sinValidator('123456789')).toBe(false);
    expect(sinValidator('123 456 789')).toBe(false);
    expect(sinValidator('000000000')).toBe(false);
    expect(sinValidator('000 000 000')).toBe(false);
    expect(sinValidator('123')).toBe(false);
    expect(sinValidator(123456789)).toBe(false);
    expect(sinValidator('')).toBe(false);
    expect(sinValidator(undefined)).toBe(false);
    expect(sinValidator(null)).toBe(false);
    expect(sinValidator(NaN)).toBe(false);
  });
});
