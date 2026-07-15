import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CalculatorMemory from '../../src/components/calculator/CalculatorMemory.vue'

const buttons = [
  { label: 'M+', event: 'memory-add' },
  { label: 'MR', event: 'memory-recall' },
  { label: 'MC', event: 'memory-clear' }
]

describe('CalculatorMemory', () => {
  it.each(buttons)('el botón "$label" emite "$event"', async ({ label, event }) => {
    const wrapper = mount(CalculatorMemory)

    const button = wrapper.findAll('button').find((b) => b.text() === label)
    await button.trigger('click')

    expect(wrapper.emitted(event)).toHaveLength(1)
  })
})