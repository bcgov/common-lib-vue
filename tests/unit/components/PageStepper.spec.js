import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/PageStepper.vue';

const localVue = createLocalVue();

describe('PageStepper.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        currentPath: '/path-b',
        routes: [
          {
            path: '/path-a',
            title: 'Path A'
          },
          {
            path: '/path-b',
            title: 'Path B'
          },
          {
            path: '/path-c',
            title: 'Path C'
          }
        ]
      }
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('PageStepper cyValue()', () => {
  it('contains cyValue content', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        currentPath: '/path-b',
        routes: [
          {
            path: '/path-a',
            title: 'Path A'
          },
          {
            path: '/path-b',
            title: 'Path B'
          },
          {
            path: '/path-c',
            title: 'Path C'
          }
        ],
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potato1]").exists()).toBe(true)
  });
});
