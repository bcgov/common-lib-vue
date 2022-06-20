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

describe('Accessibility attributes', () => {
  it('renders disabled steps as a span with expected a11y attributes', () => {
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
      }
    });
    const disabledSteps = wrapper.findAll('.step-text>span').wrappers;
    expect(disabledSteps.length).toBe(2);

    disabledSteps.forEach(disabledStep => {
      const attributes = disabledStep.attributes()
      expect(attributes.role).toBe('link');
      expect(attributes.disabled).toBe('disabled');
      expect(attributes['aria-disabled']).toBe('true');
      expect(attributes.tabindex).toBe('0');
    })
  });

  it('renders enabled steps as anchors and doesnt add disabled attributes', () => {
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
      }
    });

    const linkSteps = wrapper.findAll('.step-text>a').wrappers;
    expect(linkSteps.length).toBe(1);
    const linkStep = linkSteps[0];
    const attributes = linkStep.attributes()

    expect(attributes.role).toBeUndefined();
    expect(attributes.disabled).toBeUndefined();
    expect(attributes['aria-disabled']).toBeUndefined();
    expect(attributes.tabindex).toBeUndefined();
  });
});