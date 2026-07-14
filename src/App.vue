<script setup>
import { useCalculator } from './composables/useCalculator'
import { useMemoryStore } from './stores/memoryStore'
import CalculatorDisplay from './components/calculator/CalculatorDisplay.vue'
import CalculatorKeypad from './components/calculator/CalculatorKeypad.vue'

const { display, historyDisplay, inputNumber, inputOperator, calculate, clear, recallValue } = useCalculator()
const memory = useMemoryStore()

// Guarda el valor actual de la pantalla en la memoria (M+)
function handleMemoryAdd() {
  memory.save(Number(display.value))
}

// Recupera el valor guardado, si existe, y lo muestra en pantalla (MR)
function handleMemoryRecall() {
  if (memory.value !== null) {
    recallValue(memory.value)
  }
}

// Vacía la memoria (MC)
function handleMemoryClear() {
  memory.clear()
}
</script>

<template>
  <main style="padding: 2rem; max-width: 320px; margin: 0 auto;">
    <CalculatorDisplay :main-value="display" :history-value="historyDisplay" />
    <CalculatorKeypad
      @number="inputNumber"
      @operator="inputOperator"
      @equal="calculate"
      @clear="clear"
      @memory-add="handleMemoryAdd"
      @memory-recall="handleMemoryRecall"
      @memory-clear="handleMemoryClear"
    />
  </main>
</template>