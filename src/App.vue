<script setup>
import { useCalculator } from './composables/useCalculator'
import { useMemoryStore } from './stores/memoryStore'
import CalculatorMemory from './components/calculator/CalculatorMemory.vue'
import CalculatorDisplay from './components/calculator/CalculatorDisplay.vue'
import CalculatorKeypad from './components/calculator/CalculatorKeypad.vue'
import CurrencyConverter from './components/currency-converter/CurrencyConverter.vue'

const { display, historyDisplay, inputNumber, inputOperator, calculate, clear, recallValue, applyPercentage, toggleSign } = useCalculator()
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
    <header class="app__header">
      <h1 class="app__title">Calculadora Multifuncional</h1>
      <p class="app__subtitle">Calculadora - Conversor de Divisas - El Tiempo</p>
    </header>

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
      @percentage="applyPercentage"
      @sign="toggleSign"
    />

    <CurrencyConverter />

    <footer class="app__footer">
      <p>Nieves Durán - Bootcamp F5 Asturias</p>
    </footer>
  </main>
</template>

<style lang="scss" scoped>
.app {
  max-width: 400px;
  margin: 0 auto;
  padding: var(--spacing-lg);

  &__header {
    text-align: center;
    margin-bottom: var(--spacing-md);
  }

  &__title {
    font-size: 1.5rem;
    margin: 0;
    color: rgb(9, 152, 9);
  }

  &__subtitle {
    margin: var(--spacing-xs) 0 0;
    font-size: 0.8rem;
    color: rgb(15, 15, 220);
  }

  &__footer {
    text-align: center;
    font-size: 0.7rem;
    color: var(--color-text-muted);
    margin-top: var(--spacing-lg);
  }
}
</style>