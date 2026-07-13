import { ref } from 'vue'

// Composable que encapsula el estado y la lógica de la calculadora.
// Devuelve una API reactiva que los componentes de UI podrán consumir.
export function useCalculator() {
  const display = ref('0')
  const previousValue = ref(null)
  const operator = ref(null)

  function inputNumber(digit) {
    display.value = display.value === '0' ? digit : display.value + digit
  }

  function inputOperator(op) {
    previousValue.value = Number(display.value)
    operator.value = op
    display.value = '0'
  }

  function calculate() {
    if (previousValue.value === null || operator.value === null) return

    const current = Number(display.value)
    let result

    switch (operator.value) {
      case '+':
        result = previousValue.value + current
        break
      case '-':
        result = previousValue.value - current
        break
      case '*':
        result = previousValue.value * current
        break
      case '/':
        result = previousValue.value / current
        break
    }

    display.value = String(result)
    previousValue.value = null
    operator.value = null
  }

  return { display, inputNumber, inputOperator, calculate }
}