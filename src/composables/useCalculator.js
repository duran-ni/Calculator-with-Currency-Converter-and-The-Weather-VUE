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

  // Ejecuta la operación pendiente (previousValue + operator + display actual)
  // y deja el resultado en display. Devuelve false si hubo un error (ej. /0).
  function performPendingOperation() {
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
        if (current === 0) {
          display.value = 'Error: no se puede dividir por cero'
          previousValue.value = null
          operator.value = null
          return false
        }
        result = previousValue.value / current
        break
    }

    display.value = String(result)
    return true
  }

  function inputOperator(op) {
    if (previousValue.value !== null && operator.value !== null) {
      const success = performPendingOperation()
      if (!success) return
    }

    previousValue.value = Number(display.value)
    operator.value = op
    display.value = '0'
  }
  
  function calculate() {
    if (previousValue.value === null || operator.value === null) return

    performPendingOperation()
    previousValue.value = null
    operator.value = null
  }

  return { display, inputNumber, inputOperator, calculate }
}