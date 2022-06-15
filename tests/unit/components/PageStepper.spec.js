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

describe('PageStepper getCypressValue()', () => {
  it('contains cypress Value', () => {
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

describe('a11y', () => {
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