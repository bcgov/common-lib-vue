import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Component from '../../../src/components/DateInput.vue';
import { startOfDay } from 'date-fns';

const localVue = createLocalVue();

describe('DateInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('DateInput canCreateDate()', () => {
  const wrapper = mount(Component, {
    localVue,
  });

  test('null entries return false', async () => {
    await wrapper.setData({
      month: null,
      day: null,
      year: null,
    });
    expect(wrapper.vm.canCreateDate()).toBeFalsy();
  });

  test('works on happy path', async () => {
    await wrapper.setData({
      month: 7,
      day: '31',
      year: '2022',
    })
    expect(wrapper.vm.canCreateDate()).toBeTruthy();
  });

  test('null month returns false', async () => {
    await wrapper.setData({
      month: null,
      day: '31',
      year: '2022',
    });
    expect(wrapper.vm.canCreateDate()).toBeFalsy();
  });

  test('non-string/number month returns false', async () => {
    await wrapper.setData({
      month: [555, "potato", {
        index: "value"
      }],
      day: '31',
      year: '2022',
    });
    expect(wrapper.vm.canCreateDate()).toBeFalsy();
  });

  test('month with index of 0 returns true (maps to January)', async () => {
    await wrapper.setData({
      month: 0,
      day: '31',
      year: '2022',
    });
    expect(wrapper.vm.canCreateDate()).toBeTruthy();
  });

  test('day with index of 0 returns false', async () => {
    await wrapper.setData({
      month: 12,
      day: 0,
      year: '2022',
    });
    expect(wrapper.vm.canCreateDate()).toBeFalsy();
  });

  test('non-string/number day returns false', async () => {
    await wrapper.setData({
      month: '12',
      day: [555, "potato", {
        index: "value"
      }],
      year: '2022',
    });
    expect(wrapper.vm.canCreateDate()).toBeFalsy();
  });

  test('non-string/number year returns false', async () => {
    await wrapper.setData({
      month: 11,
      day: '31',
      year: [555, "potato", {
        index: "value"
      }],
    });
    expect(wrapper.vm.canCreateDate()).toBeFalsy();
  });

  test('feb 29 in non leap year returns false', async () => {
    await wrapper.setData({
      //0 is January, so 1 is February
      month: 1,
      day: '29',
      year: '2021',
    });
    expect(wrapper.vm.canCreateDate()).toBeFalsy();
  });

  test('feb 29 in leap year returns true', async () => {
    await wrapper.setData({
      //0 is January, so 1 is February
      month: 1,
      day: '29',
      year: '2024',
    });
    expect(wrapper.vm.canCreateDate()).toBeTruthy();
  });

  test('incorrect days in month returns false', async () => {
    await wrapper.setData({
      //0 is January, so 1 is February
      month: 1,
      day: '30',
      year: '2021',
    });
    expect(wrapper.vm.canCreateDate()).toBeFalsy();
  });
});

describe('DateInput processDate()', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
    });
  });

  test('invalid entry emits falsy values', async () => {
    await wrapper.setData({
      month: null,
      day: null,
      year: null,
    });
    await wrapper.vm.processDate();
    expect(wrapper.vm.month).toBeFalsy();
    expect(wrapper.vm.day).toBeFalsy();
    expect(wrapper.vm.year).toBeFalsy();
    expect(wrapper.emitted().input).toEqual([
      [null]
    ]);
    expect(wrapper.emitted().processDate).toEqual([
      [{
        date: null,
        month: null,
        day: null,
        year: null,
      }]
    ]);
  });

  test('valid entry emits correct values', async () => {
    const year = '2022';
    const month = 1;
    const day = '22';
    await wrapper.setData({
      month,
      day,
      year,
    });
    await wrapper.vm.processDate();
    expect(wrapper.vm.month).toBeTruthy();
    expect(wrapper.vm.day).toBeTruthy();
    expect(wrapper.vm.year).toBeTruthy();
    const emittedDate = startOfDay(new Date(year, month, day));
    const emittedObj = {
      date: emittedDate,
      month,
      day,
      year,
    };
    expect(wrapper.emitted().input).toEqual([
      [emittedDate],
      [emittedDate], // Second event triggered by datePickerDate watcher.
    ]);
    expect(wrapper.emitted().processDate).toEqual([
      [emittedObj],
      [emittedObj], // Second event triggered by datePickerDate watcher.
    ]);
  });
});

describe('DateInput openCloseDatePicker()', () => {
  const wrapper = mount(Component, {
    localVue
  });

  test('function properly swaps isDatePickerOpen prop between true and false', async () => {
    const fakeEvent = {
      target: {
        value: "potato"
      },
      stopPropagation: jest.fn()
    };
    await wrapper.setProps({
      isDatePickerOpen: false
    });
    await wrapper.vm.openCloseDatePicker(fakeEvent);
    expect(wrapper.vm.isDatePickerOpen).toBeTruthy();

    await wrapper.setProps({
      isDatePickerOpen: true
    });
    await wrapper.vm.openCloseDatePicker(fakeEvent);
    expect(wrapper.vm.isDatePickerOpen).toBeFalsy();
  });
});

describe('DateInput onBlurMonth()', () => {
  const wrapper = mount(Component, {
    localVue,
  });

  test('sets month data variable', () => {
    const processDateSpy = jest.spyOn(wrapper.vm, 'processDate');
    wrapper.vm.onBlurMonth({
      target: {
        value: '0'
      }
    });
    expect(wrapper.vm.month).toBe(0);
    expect(processDateSpy).toHaveBeenCalled();
  });
});

describe('DateInput onBlurDay()', () => {
  const wrapper = mount(Component, {
    localVue,
  });

  test('sets day data variable', () => {
    const processDateSpy = jest.spyOn(wrapper.vm, 'processDate');
    wrapper.vm.onBlurDay({
      target: {
        value: '1'
      }
    });
    expect(wrapper.vm.day).toBe('1');
    expect(processDateSpy).toHaveBeenCalled();
  });
});

describe('DateInput onBlurYear()', () => {
  const wrapper = mount(Component, {
    localVue,
  });

  test('sets year data variable', () => {
    const processDateSpy = jest.spyOn(wrapper.vm, 'processDate');
    wrapper.vm.onBlurYear({
      target: {
        value: '2021'
      }
    });
    expect(wrapper.vm.year).toBe('2021');
    expect(processDateSpy).toHaveBeenCalled();
  });
});

describe('DateInput getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        cypressId: 'potato'
      }
    });
    expect(wrapper.find("[data-cy=potatoYear]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatoDay]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatoMonth1]").exists()).toBe(true)
    expect(wrapper.find("[data-cy=potatoCalendarIcon]").exists()).toBe(true)
  });
});
