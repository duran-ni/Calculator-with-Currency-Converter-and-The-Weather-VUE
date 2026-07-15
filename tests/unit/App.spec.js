import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import App from '../../src/App.vue'

vi.mock('axios')

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    axios.get.mockResolvedValue({ data: { ciudades: [] } })
  })

  it('calcula calculatorAmount a partir del display de la calculadora', async () => {
    const wrapper = mount(App)

    const sevenButton = wrapper.findAll('button').find((b) => b.text() === '7')
    await sevenButton.trigger('click')

    const input = wrapper.find('.currency-converter__input')
    expect(input.element.value).toBe('7')
  })

  it('calculatorAmount cae a 0 si la pantalla muestra un mensaje de error', async () => {
    const wrapper = mount(App)

    for (const label of ['5', '÷', '0', '=']) {
      const button = wrapper.findAll('button').find((b) => b.text() === label)
      await button.trigger('click')
    }

    const input = wrapper.find('.currency-converter__input')
    expect(input.element.value).toBe('0')
  })

  it('guarda el valor en memoria al pulsar M+ y lo recupera con MR', async () => {
    const wrapper = mount(App)

    for (const label of ['4', '2']) {
      const button = wrapper.findAll('button').find((b) => b.text() === label)
      await button.trigger('click')
    }

    await wrapper.findAll('button').find((b) => b.text() === 'M+').trigger('click')
    await wrapper.findAll('button').find((b) => b.text() === 'CE').trigger('click')
    await wrapper.findAll('button').find((b) => b.text() === 'MR').trigger('click')

    expect(wrapper.find('.calculator-display__main').text()).toBe('42')
  })

  it('MR no hace nada si no hay valor guardado en memoria', async () => {
    const wrapper = mount(App)

    await wrapper.findAll('button').find((b) => b.text() === 'MR').trigger('click')

    expect(wrapper.find('.calculator-display__main').text()).toBe('0')
  })

  it('borra la memoria al pulsar MC', async () => {
    const wrapper = mount(App)

    await wrapper.findAll('button').find((b) => b.text() === '9').trigger('click')
    await wrapper.findAll('button').find((b) => b.text() === 'M+').trigger('click')
    await wrapper.findAll('button').find((b) => b.text() === 'MC').trigger('click')
    await wrapper.findAll('button').find((b) => b.text() === 'CE').trigger('click')
    await wrapper.findAll('button').find((b) => b.text() === 'MR').trigger('click')

    expect(wrapper.find('.calculator-display__main').text()).toBe('0')
  })
})