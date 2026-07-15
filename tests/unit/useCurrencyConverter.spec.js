import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { useCurrencyConverter } from '../../src/composables/useCurrencyConverter'

vi.mock('axios')

describe('useCurrencyConverter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('convierte una cantidad entre dos divisas distintas usando el cruce de tasas', async () => {
    axios.get.mockResolvedValue({
      data: { rates: { EUR: '0.9', JPY: '148' } }
    })

    const { amount, fromCurrency, toCurrency, result, convert } = useCurrencyConverter()

    amount.value = 10
    fromCurrency.value = 'EUR'
    toCurrency.value = 'JPY'

    await convert()

    expect(result.value).toBeCloseTo(1644.44, 1)
  })

  it('devuelve la misma cantidad si origen y destino son la misma divisa', async () => {
    const { amount, fromCurrency, toCurrency, result, convert } = useCurrencyConverter()

    amount.value = 25
    fromCurrency.value = 'EUR'
    toCurrency.value = 'EUR'

    await convert()

    expect(result.value).toBe(25)
    expect(axios.get).not.toHaveBeenCalled()
  })

  it('intercambia las divisas de origen y destino con swap()', () => {
    const { fromCurrency, toCurrency, swap } = useCurrencyConverter()

    fromCurrency.value = 'EUR'
    toCurrency.value = 'USD'

    swap()

    expect(fromCurrency.value).toBe('USD')
    expect(toCurrency.value).toBe('EUR')
  })

  it('marca loading en true durante la petición y en false al terminar', async () => {
    let resolvePromise
    axios.get.mockReturnValue(new Promise((resolve) => { resolvePromise = resolve }))

    const { amount, fromCurrency, toCurrency, loading, convert } = useCurrencyConverter()
    amount.value = 10
    fromCurrency.value = 'EUR'
    toCurrency.value = 'USD'

    const conversionPromise = convert()
    expect(loading.value).toBe(true)

    resolvePromise({ data: { rates: { EUR: '0.9', USD: '1' } } })
    await conversionPromise

    expect(loading.value).toBe(false)
  })

  it('muestra un error si la API falla, sin inventar un resultado', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'))

    const { amount, fromCurrency, toCurrency, result, error, convert } = useCurrencyConverter()
    amount.value = 10
    fromCurrency.value = 'EUR'
    toCurrency.value = 'USD'

    await convert()

    expect(error.value).toBeTruthy()
    expect(result.value).toBeNull()
  })

  it('expone la tasa de cambio calculada en rate', async () => {
    axios.get.mockResolvedValue({
      data: { rates: { EUR: '0.9', JPY: '148' } }
    })

    const { amount, fromCurrency, toCurrency, rate, convert } = useCurrencyConverter()

    amount.value = 10
    fromCurrency.value = 'EUR'
    toCurrency.value = 'JPY'

    await convert()

    expect(rate.value).toBeCloseTo(164.44, 1)
  })

  it('la tasa es 1 cuando origen y destino son la misma divisa', async () => {
    const { amount, fromCurrency, toCurrency, rate, convert } = useCurrencyConverter()

    amount.value = 25
    fromCurrency.value = 'EUR'
    toCurrency.value = 'EUR'

    await convert()

    expect(rate.value).toBe(1)
  })
})