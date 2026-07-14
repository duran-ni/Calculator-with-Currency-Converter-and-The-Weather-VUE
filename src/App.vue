<script setup>
import { useCalculator } from './composables/useCalculator'
import CalculatorDisplay from './components/calculator/CalculatorDisplay.vue'
import CalculatorKeypad from './components/calculator/CalculatorKeypad.vue'

const { display, historyDisplay, inputNumber, inputOperator, calculate, clear } = useCalculator()
</script>

<template>
  <main style="padding: 2rem; max-width: 320px; margin: 0 auto;">
    <CalculatorDisplay :main-value="display" :history-value="historyDisplay" />
    <CalculatorKeypad
      @number="inputNumber"
      @operator="inputOperator"
      @equal="calculate"
      @clear="clear"
    />
  </main>
</template>