import { describe, it, expect } from "vitest";
import { useCalculator } from "../../src/composables/useCalculator";

describe("useCalculator", () => {
  it("suma dos números correctamente", () => {
    const { display, inputNumber, inputOperator, calculate } = useCalculator();

    inputNumber("5");
    inputOperator("+");
    inputNumber("3");
    calculate();

    expect(display.value).toBe("8");
  });

  it("resta dos números correctamente", () => {
    const { display, inputNumber, inputOperator, calculate } = useCalculator();

    inputNumber("9");
    inputOperator("-");
    inputNumber("4");
    calculate();

    expect(display.value).toBe("5");
  });

  it("multiplica dos números correctamente", () => {
    const { display, inputNumber, inputOperator, calculate } = useCalculator();

    inputNumber("6");
    inputOperator("*");
    inputNumber("7");
    calculate();

    expect(display.value).toBe("42");
  });

  it("divide dos números correctamente", () => {
    const { display, inputNumber, inputOperator, calculate } = useCalculator();

    inputNumber("8");
    inputOperator("/");
    inputNumber("2");
    calculate();

    expect(display.value).toBe("4");
  });

  it("muestra un error al dividir entre cero", () => {
    const { display, inputNumber, inputOperator, calculate } = useCalculator();

    inputNumber("5");
    inputOperator("/");
    inputNumber("0");
    calculate();

    expect(display.value).toBe("Error: no se puede dividir por cero");
  });

  it('encadena operaciones si se pulsa un operador antes de "="', () => {
    const { display, inputNumber, inputOperator, calculate } = useCalculator();

    inputNumber("2");
    inputOperator("+");
    inputNumber("3");
    inputOperator("*");
    inputNumber("4");
    calculate();

    expect(display.value).toBe("20");
  });

  it("no añade un segundo punto decimal si ya hay uno", () => {
    const { display, inputNumber } = useCalculator();

    inputNumber("3");
    inputNumber(".");
    inputNumber("5");
    inputNumber(".");
    inputNumber("7");

    expect(display.value).toBe("3.57");
  });

  it('resetea la calculadora al pulsar CE', () => {
    const { display, inputNumber, inputOperator, clear } = useCalculator()

    inputNumber('7')
    inputOperator('+')
    inputNumber('2')
    clear()

    expect(display.value).toBe('0')
  })

  it('expone un histórico con el número y operador pendientes', () => {
    const { historyDisplay, inputNumber, inputOperator } = useCalculator()

    expect(historyDisplay.value).toBe('')

    inputNumber('5')
    inputOperator('+')

    expect(historyDisplay.value).toBe('5 +')
  })

  it('recupera un valor y lo muestra en pantalla con recallValue()', () => {
    const { display, recallValue } = useCalculator()

    recallValue(99)

    expect(display.value).toBe('99')
  })

  it('convierte el valor en pantalla a su porcentaje con applyPercentage()', () => {
    const { display, inputNumber, applyPercentage } = useCalculator()

    inputNumber('5')
    inputNumber('0')
    applyPercentage()

    expect(display.value).toBe('0.5')
  })

  it('invierte el signo del valor en pantalla con toggleSign()', () => {
    const { display, inputNumber, toggleSign } = useCalculator()

    inputNumber('5')
    toggleSign()

    expect(display.value).toBe('-5')
  })

  it('no muestra "-0" al invertir el signo de "0"', () => {
    const { display, toggleSign } = useCalculator()

    toggleSign()

    expect(display.value).toBe('0')
  })
});
