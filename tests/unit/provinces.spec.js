import { describe, it, expect } from 'vitest'
import { PROVINCIAS } from '../../src/models/provinces'

describe('PROVINCIAS', () => {
  it('contiene las 52 provincias españolas', () => {
    expect(PROVINCIAS).toHaveLength(52)
  })

  it('no tiene códigos de provincia duplicados', () => {
    const codigos = PROVINCIAS.map((p) => p.codProv)
    const codigosUnicos = new Set(codigos)

    expect(codigosUnicos.size).toBe(codigos.length)
  })
})