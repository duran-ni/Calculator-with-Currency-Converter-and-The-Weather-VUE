import { describe, it, expect } from 'vitest'
import { getSkyIcon } from '../../src/utils/skyIcons'

describe('getSkyIcon', () => {
  it('devuelve el icono correspondiente a un id conocido', () => {
    expect(getSkyIcon('11')).toBe('☀️')
  })

  it('devuelve un icono por defecto para un id desconocido', () => {
    expect(getSkyIcon('999')).toBe('☁️')
  })

  it('devuelve el icono de niebla para el id 81', () => {
    expect(getSkyIcon('81')).toBe('🌫️')
  })

  it('devuelve el icono de tormenta para el id 51', () => {
    expect(getSkyIcon('51')).toBe('⛈️')
  })

  it('devuelve el icono nocturno de despejado para "11n"', () => {
    expect(getSkyIcon('11n')).toBe('🌙')
  })
})