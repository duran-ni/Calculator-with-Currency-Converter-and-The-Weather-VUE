import { describe, it, expect } from 'vitest'
import { mapCurrencyRates } from '../../src/models/currencyModel'

describe('mapCurrencyRates', () => {
  it('convierte las tasas recibidas de texto a número', () => {
    const result = mapCurrencyRates({ rates: { EUR: '0.9', JPY: '148' } })

    expect(result).toEqual({ EUR: 0.9, JPY: 148 })
  })

  it('devuelve un objeto vacío si no hay tasas', () => {
    const result = mapCurrencyRates({ rates: {} })

    expect(result).toEqual({})
  })
})