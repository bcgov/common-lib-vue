import { mount } from '@vue/test-utils'
import TimeInput from '@/components/TimeInput.vue'
import { nextTick } from 'vue'
import { it, describe, expect } from 'vitest'

describe('TimeInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(TimeInput)
    expect(wrapper.element).toBeDefined()
  })
})

describe('TimeInput getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(TimeInput, {
      props: {
        cypressId: 'potato'
      }
    })
    expect(wrapper.find('[data-cy=potatoHour1]').exists()).toBe(true)
    expect(wrapper.find('[data-cy=potatoMinute1]').exists()).toBe(true)
  })
})

describe('TimeInput event handling', () => {
  const myTime = {
    hour: '3',
    minute: '15',
    time: '3:15'
  }

  it('loads model data from v-model and updates the value when changing time', async () => {
    const wrapper = mount({
      data() {
        return {
          myTime
        }
      },
      template: '<div><TimeInput v-model="myTime" /></div>',
      components: { TimeInput }
    })

    expect(wrapper.vm.myTime.minute).toBe('15')
    expect(wrapper.vm.myTime.hour).toBe('3')
    expect(wrapper.vm.myTime.time).toBe('3:15')

    const minuteSelect = wrapper.find('#-minute-select')
    const hourSelect = wrapper.find('#-hour-select')
    const minuteOptions = await minuteSelect.findAll('option')
    const hourOptions = await hourSelect.findAll('option')

    // Option indices one higher due to default option
    await hourOptions.at(10).setSelected()
    await minuteOptions.at(43).setSelected()
    expect(wrapper.vm.myTime.hour).toBe('9')
    expect(wrapper.vm.myTime.minute).toBe('42')
    expect(wrapper.vm.myTime.time).toBe('9:42')
  })

  it('updates model value to null and shows the default option when clearing the select fields', async () => {
    const wrapper = mount({
      data() {
        return {
          myTime
        }
      },
      template: '<div><TimeInput v-model="myTime" /></div>',
      components: { TimeInput }
    })

    const minuteSelect = wrapper.find('#-minute-select')
    const hourSelect = wrapper.find('#-hour-select')
    const minuteOptions = await minuteSelect.findAll('option')
    const hourOptions = await hourSelect.findAll('option')

    expect(minuteSelect.element.value).toBe('15')
    expect(hourSelect.element.value).toBe('3')

    await hourOptions.at(0).setSelected()
    expect(wrapper.vm.myTime.time).toBe(null)
    expect(wrapper.vm.myTime.hour).toBe(null)
    expect(wrapper.vm.myTime.minute).not.toBe(null)

    await minuteOptions.at(0).setSelected()
    expect(wrapper.vm.myTime.minute).toBe(null)

    expect(minuteSelect.element.value).toBe('')
    expect(hourSelect.element.value).toBe('')
  })

  it('shows default option labels when no initial time is provided or time is cleared in parent', async () => {
    const wrapper = mount({
      data() {
        return {
          myTime: {
            minute: null,
            hour: null,
            time: null
          }
        }
      },
      template: '<div><TimeInput v-model="myTime" /></div>',
      components: { TimeInput }
    })

    const timeInput = wrapper.findComponent(TimeInput)
    expect(timeInput.vm.minute).toBe('')
    expect(timeInput.vm.hour).toBe('')

    wrapper.vm.myTime = {
      minute: '15',
      hour: '4',
      time: '4:15'
    }

    await nextTick()
    expect(timeInput.vm.minute).toBe('15')
    expect(timeInput.vm.hour).toBe('4')

    wrapper.vm.myTime = {
      minute: null,
      hour: null,
      time: null
    }

    await nextTick()
    expect(timeInput.vm.minute).toBe('')
    expect(timeInput.vm.hour).toBe('')
  })
})
