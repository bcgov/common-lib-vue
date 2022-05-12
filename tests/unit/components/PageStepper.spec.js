import { mount } from '@vue/test-utils';
import Component from '../../../src/components/PageStepper.vue';

describe('PageStepper.vue', () => {
  it('renders with expected path titles and tags', () => {
    const routes = [
      {
        path: '/path-a',
        title: 'Path A',
      },
      {
        path: '/path-b',
        title: 'Path B',
      },
      {
        path: '/path-c',
        title: 'Path C',
      },
    ]
    const wrapper = mount(Component, {
      props: {
        currentPath: '/path-b',
        routes,
      },
    });
    expect(wrapper.element).toBeDefined();
    const horizontalStepper = wrapper.find('.horizontal-stepper-container')
    const horizontalStepperLinks = horizontalStepper.findAll('a');

    // Only the previous path (path a) should be a link
    expect(horizontalStepperLinks.length).toBe(1);

    const horizontalStepperTitles = horizontalStepper.findAll('.step-text');
    expect(horizontalStepperTitles.length).toBe(routes.length)
    horizontalStepperTitles.forEach((el,i) => {
      expect(el.text()).toBe(routes[i].title)
    })
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
            title: 'Path A',
          },
          {
            path: '/path-b',
            title: 'Path B',
          },
          {
            path: '/path-c',
            title: 'Path C',
          },
        ],
        cypressId: 'potato',
      },
    });
    expect(wrapper.find("[data-cy=potato1]").exists()).toBe(true)
  });
});
