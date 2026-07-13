import { describe, it, expect } from 'vitest'
import { useCalculator } from '../../src/composables/useCalculator'

describe('useCalculator', () => {
  it('suma dos números correctamente', () => {
    const { display, inputNumber, inputOperator, calculate } = useCalculator()

    inputNumber('5')
    inputOperator('+')
    inputNumber('3')
    calculate()

    expect(display.value).toBe('8')
  })
})