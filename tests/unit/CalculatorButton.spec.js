import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CalculatorButton from '../../src/components/calculator/CalculatorButton.vue'

describe('CalculatorButton', () => {
  it('muestra el texto recibido en la prop label', () => {
    const wrapper = mount(CalculatorButton, {
      props: { label: '7' }
    })

    expect(wrapper.text()).toBe('7')
  })

  it('aplica la variante "default" cuando no se indica variant', () => {
    const wrapper = mount(CalculatorButton, {
      props: { label: '7' }
    })

    expect(wrapper.classes()).toContain('calculator-button--default')
  })

  it('aplica la variante indicada en la prop variant', () => {
    const wrapper = mount(CalculatorButton, {
      props: { label: '+', variant: 'operator' }
    })

    expect(wrapper.classes()).toContain('calculator-button--operator')
  })

  it('emite "press" al hacer click', async () => {
    const wrapper = mount(CalculatorButton, {
      props: { label: '=' }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('press')).toHaveLength(1)
  })
})