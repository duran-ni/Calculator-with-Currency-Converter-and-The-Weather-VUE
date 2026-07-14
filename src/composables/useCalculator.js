import { ref, computed } from 'vue'

// Composable que encapsula el estado y la lógica de la calculadora.
// Devuelve una API reactiva que los componentes de UI podrán consumir.
export function useCalculator() {
  const display = ref('0')
  const previousValue = ref(null)
  const operator = ref(null)

  const historyDisplay = computed(() => {
    if (previousValue.value === null || operator.value === null) return ''
    return `${previousValue.value} ${operator.value}`
  })

  function inputNumber(digit) {
    if (digit === '.' && display.value.includes('.')) return

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

  function clear() {
    display.value = '0'
    previousValue.value = null
    operator.value = null
  }

  // Recupera un valor externo (p. ej. desde el store de memoria)
  // y lo escribe directamente en la pantalla principal.
  function recallValue(value) {
    display.value = String(value)
  }

  return { display, historyDisplay, inputNumber, inputOperator, calculate, clear, recallValue }
}