import { mount } from '@vue/test-utils';
import TimeInput from '../../../src/components/TimeInput.vue';

describe('TimeInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(TimeInput);
    expect(wrapper.element).toBeDefined();
  });
});

describe('TimeInput getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(TimeInput, {
      props: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potatoHour1]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatoMinute1]").exists()).toBe(true)
  });
});

describe("TimeInput event handling", () => {
  it("works correctly with v-model", async () => {
    const wrapper = mount({
      data() {
        return { 
          myTime: {
            hour: 3,
            minute: 15,
            time: '3:15',
          }
        };
      },
      template: '<div><TimeInput v-model="myTime" /></div>',
      components: { TimeInput },
    });

    expect(wrapper.vm.myTime.time).toBe('3:15');
    await wrapper.find('.hour-select').setValue(4);
    await wrapper.find('.minute-select').setValue(25);
    expect(wrapper.vm.myTime.time).toBe('4:25');
  });
});