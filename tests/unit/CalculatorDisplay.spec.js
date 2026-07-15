import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CalculatorDisplay from '../../src/components/calculator/CalculatorDisplay.vue'

describe('CalculatorDisplay', () => {
  it('muestra el valor principal recibido', () => {
    const wrapper = mount(CalculatorDisplay, {
      props: { mainValue: '20' }
    })

    expect(wrapper.find('.calculator-display__main').text()).toBe('20')
  })

  it('muestra el histórico recibido', () => {
    const wrapper = mount(CalculatorDisplay, {
      props: { mainValue: '20', historyValue: '12 +' }
    })

    expect(wrapper.find('.calculator-display__history').text()).toBe('12 +')
  })

  it('usa cadena vacía como histórico por defecto si no se pasa historyValue', () => {
    const wrapper = mount(CalculatorDisplay, {
      props: { mainValue: '20' }
    })

    expect(wrapper.find('.calculator-display__history').text()).toBe('')
  })

  it('no aplica la clase de error si mainValue no empieza por "Error"', () => {
    const wrapper = mount(CalculatorDisplay, {
      props: { mainValue: '20' }
    })

    expect(wrapper.find('.calculator-display__main').classes()).not.toContain('calculator-display__main--error')
  })

  it('aplica la clase de error si mainValue empieza por "Error"', () => {
    const wrapper = mount(CalculatorDisplay, {
      props: { mainValue: 'Error: no se puede dividir por cero' }
    })

    expect(wrapper.find('.calculator-display__main').classes()).toContain('calculator-display__main--error')
  })
})