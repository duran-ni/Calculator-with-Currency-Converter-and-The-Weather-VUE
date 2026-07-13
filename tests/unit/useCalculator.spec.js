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

   it('resta dos números correctamente', () => {
    const { display, inputNumber, inputOperator, calculate } = useCalculator()

    inputNumber('9')
    inputOperator('-')
    inputNumber('4')
    calculate()

    expect(display.value).toBe('5')
  })

  it('multiplica dos números correctamente', () => {
    const { display, inputNumber, inputOperator, calculate } = useCalculator()

    inputNumber('6')
    inputOperator('*')
    inputNumber('7')
    calculate()

    expect(display.value).toBe('42')
  })

  it('divide dos números correctamente', () => {
    const { display, inputNumber, inputOperator, calculate } = useCalculator()

    inputNumber('8')
    inputOperator('/')
    inputNumber('2')
    calculate()

    expect(display.value).toBe('4')
  })

  it('muestra un error al dividir entre cero', () => {
    const { display, inputNumber, inputOperator, calculate } = useCalculator()

    inputNumber('5')
    inputOperator('/')
    inputNumber('0')
    calculate()

    expect(display.value).toBe('Error: no se puede dividir por cero')
  })

  it('encadena operaciones si se pulsa un operador antes de "="', () => {
    const { display, inputNumber, inputOperator, calculate } = useCalculator()

    inputNumber('2')
    inputOperator('+')
    inputNumber('3')
    inputOperator('*')
    inputNumber('4')
    calculate()

    expect(display.value).toBe('20')
  })
})