import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import CurrencyConverter from '../../src/components/currency-converter/CurrencyConverter.vue'
import { useCurrencyConverter } from '../../src/composables/useCurrencyConverter'

vi.mock('../../src/composables/useCurrencyConverter', () => ({
  useCurrencyConverter: vi.fn()
}))

function mockConverter(overrides = {}) {
  const base = {
    amount: ref(0),
    fromCurrency: ref('EUR'),
    toCurrency: ref('USD'),
    result: ref(null),
    rate: ref(null),
    loading: ref(false),
    error: ref(null),
    convert: vi.fn(),
    swap: vi.fn()
  }
  const merged = { ...base, ...overrides }
  useCurrencyConverter.mockReturnValue(merged)
  return merged
}

describe('CurrencyConverter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sincroniza el importe con la prop initialAmount al montar', () => {
    const mocked = mockConverter()

    mount(CurrencyConverter, { props: { initialAmount: 50 } })

    expect(mocked.amount.value).toBe(50)
  })

  it('actualiza amount mediante el input', async () => {
    const mocked = mockConverter()

    const wrapper = mount(CurrencyConverter, { props: { initialAmount: 0 } })
    await wrapper.find('.currency-converter__input').setValue(15)

    expect(mocked.amount.value).toBe(15)
  })

  it('actualiza fromCurrency y toCurrency mediante los selects', async () => {
    const mocked = mockConverter()

    const wrapper = mount(CurrencyConverter, { props: { initialAmount: 0 } })
    const selects = wrapper.findAll('select')

    await selects[0].setValue('JPY')
    await selects[1].setValue('EUR')

    expect(mocked.fromCurrency.value).toBe('JPY')
    expect(mocked.toCurrency.value).toBe('EUR')
  })

  it('llama a convert() al pulsar "Convertir"', async () => {
    const mocked = mockConverter()

    const wrapper = mount(CurrencyConverter, { props: { initialAmount: 0 } })
    await wrapper.find('.currency-converter__convert').trigger('click')

    expect(mocked.convert).toHaveBeenCalledOnce()
  })

  it('llama a swap() al pulsar el botón ⇅', async () => {
    const mocked = mockConverter()

    const wrapper = mount(CurrencyConverter, { props: { initialAmount: 0 } })
    await wrapper.find('.currency-converter__swap').trigger('click')

    expect(mocked.swap).toHaveBeenCalledOnce()
  })

  it('muestra el mensaje de carga cuando loading es true', () => {
    mockConverter({ loading: ref(true) })

    const wrapper = mount(CurrencyConverter, { props: { initialAmount: 0 } })

    expect(wrapper.find('.currency-converter__loading').exists()).toBe(true)
  })

  it('no muestra el mensaje de carga cuando loading es false', () => {
    mockConverter({ loading: ref(false) })

    const wrapper = mount(CurrencyConverter, { props: { initialAmount: 0 } })

    expect(wrapper.find('.currency-converter__loading').exists()).toBe(false)
  })

  it('muestra el mensaje de error cuando error tiene contenido', () => {
    mockConverter({ error: ref('No se pudo obtener el tipo de cambio.') })

    const wrapper = mount(CurrencyConverter, { props: { initialAmount: 0 } })

    expect(wrapper.find('.currency-converter__error').text()).toBe('No se pudo obtener el tipo de cambio.')
  })

  it('muestra el resultado y la tasa cuando hay datos y no hay loading ni error', () => {
    mockConverter({ result: ref(21.73), rate: ref(1.0865) })

    const wrapper = mount(CurrencyConverter, { props: { initialAmount: 0 } })

    expect(wrapper.find('.currency-converter__result').exists()).toBe(true)
    expect(wrapper.find('.currency-converter__rate').exists()).toBe(true)
  })

  it('no muestra el resultado si loading es true, aunque haya un valor previo', () => {
    mockConverter({ result: ref(21.73), rate: ref(1.0865), loading: ref(true) })

    const wrapper = mount(CurrencyConverter, { props: { initialAmount: 0 } })

    expect(wrapper.find('.currency-converter__result').exists()).toBe(false)
    expect(wrapper.find('.currency-converter__rate').exists()).toBe(false)
  })

  it('no muestra el resultado si hay un error, aunque haya un valor previo', () => {
    mockConverter({ result: ref(21.73), rate: ref(1.0865), error: ref('fallo') })

    const wrapper = mount(CurrencyConverter, { props: { initialAmount: 0 } })

    expect(wrapper.find('.currency-converter__result').exists()).toBe(false)
  })
})