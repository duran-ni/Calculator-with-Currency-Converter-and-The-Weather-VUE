<script setup>
import { useCalculator } from './composables/useCalculator'
import { useMemoryStore } from './stores/memoryStore'
import CalculatorMemory from './components/calculator/CalculatorMemory.vue'
import CalculatorDisplay from './components/calculator/CalculatorDisplay.vue'
import CalculatorKeypad from './components/calculator/CalculatorKeypad.vue'

const { display, historyDisplay, inputNumber, inputOperator, calculate, clear, recallValue } = useCalculator()
const memory = useMemoryStore()

function handleMemoryAdd() {
  memory.save(Number(display.value))
}

function handleMemoryRecall() {
  if (memory.value !== null) {
    recallValue(memory.value)
  }
}

function handleMemoryClear() {
  memory.clear()
}
</script>

<template>
  <main class="app">
    <CalculatorMemory
      @memory-add="handleMemoryAdd"
      @memory-recall="handleMemoryRecall"
      @memory-clear="handleMemoryClear"
    />
    <CalculatorDisplay :main-value="display" :history-value="historyDisplay" />
    <CalculatorKeypad
      @number="inputNumber"
      @operator="inputOperator"
      @equal="calculate"
      @clear="clear"
    />
  </main>
</template>

<style lang="scss" scoped>
.app {
  max-width: 400px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}
</style>