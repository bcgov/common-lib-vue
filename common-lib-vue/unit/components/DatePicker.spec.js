import { mount } from '@vue/test-utils'
import DatePicker from '@/components/DatePicker.vue'
import { it, describe, expect } from 'vitest'

describe('DatePicker.vue', () => {
  it('renders', () => {
    const wrapper = mount(DatePicker)
    expect(wrapper.element).toBeDefined()
  })

  it('works with v-model', async () => {
    const initialDate = new Date('02-02-2020')
    const wrapper = mount({
      data() {
        return {
          selected: initialDate
        }
      },
      template: '<div><DatePicker v-model="selected" /></div>',
      components: { DatePicker }
    })

    const dateLabel = wrapper.find('.date-label')
    expect(dateLabel.text()).toBe('February 2020')

    const selectedDay = wrapper.find('.selected')
    expect(selectedDay.text()).toBe('2')

    const increaseYearButton = wrapper.find('.year-arrow.right')
    const increaseMonthButton = wrapper.find('.month-arrow.right')
    const thirdDateCell = wrapper.findAll('.date-cell').filter((cell) => cell.text() === '3')[0]

    await increaseMonthButton.trigger('click')
    await increaseYearButton.trigger('click')
    await thirdDateCell.find('.circle').trigger('click')

    expect(wrapper.vm.selected.getTime()).toBe(new Date('03-03-2021').getTime())
  })
})

describe('DatePicker getCypressValue()', () => {
  it('contains cypress Value', () => {
    const wrapper = mount(DatePicker, {
      props: {
        cypressId: 'potato'
      }
    })
    expect(wrapper.find('[data-cy=potatoChevronDoubleLeft]').exists()).toBe(true)
    expect(wrapper.find('[data-cy=potatoChevronLeft]').exists()).toBe(true)
    expect(wrapper.find('[data-cy=potatoChevronRight]').exists()).toBe(true)
    expect(wrapper.find('[data-cy=potatoChevronDoubleRight]').exists()).toBe(true)
    expect(wrapper.find('[data-cy=potatoDay0]').exists()).toBe(true)
  })
})
