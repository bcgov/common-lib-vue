import { mount } from '@vue/test-utils';
import Component from '../../../src/components/PageStepper.vue';

describe('PageStepper.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      props: {
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

describe('PageStepper getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Component, {
      props: {
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
