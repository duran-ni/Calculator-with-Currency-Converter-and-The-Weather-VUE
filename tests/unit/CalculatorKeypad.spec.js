import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CalculatorKeypad from '../../src/components/calculator/CalculatorKeypad.vue'

const buttons = [
  { label: 'CE', event: 'clear' },
  { label: '%', event: 'percentage' },
  { label: '±', event: 'sign' },
  { label: '÷', event: 'operator', payload: '/' },
  { label: '7', event: 'number', payload: '7' },
  { label: '8', event: 'number', payload: '8' },
  { label: '9', event: 'number', payload: '9' },
  { label: '×', event: 'operator', payload: '*' },
  { label: '4', event: 'number', payload: '4' },
  { label: '5', event: 'number', payload: '5' },
  { label: '6', event: 'number', payload: '6' },
  { label: '−', event: 'operator', payload: '-' },
  { label: '1', event: 'number', payload: '1' },
  { label: '2', event: 'number', payload: '2' },
  { label: '3', event: 'number', payload: '3' },
  { label: '+', event: 'operator', payload: '+' },
  { label: '0', event: 'number', payload: '0' },
  { label: '.', event: 'number', payload: '.' },
  { label: '=', event: 'equal' }
]

describe('CalculatorKeypad', () => {
  it.each(buttons)('el botón "$label" emite "$event"', async ({ label, event, payload }) => {
    const wrapper = mount(CalculatorKeypad)

    const button = wrapper.findAll('button').find((b) => b.text() === label)
    await button.trigger('click')

    if (payload !== undefined) {
      expect(wrapper.emitted(event)[0]).toEqual([payload])
    } else {
      expect(wrapper.emitted(event)).toHaveLength(1)
    }
  })
})