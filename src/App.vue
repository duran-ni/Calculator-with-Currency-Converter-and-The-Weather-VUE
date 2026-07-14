<script setup>
import { useCalculator } from './composables/useCalculator'
import CalculatorDisplay from './components/calculator/CalculatorDisplay.vue'

const { display, historyDisplay } = useCalculator()
</script>

<template>
  <main style="padding: 2rem;">
    <CalculatorDisplay :main-value="display" :history-value="historyDisplay" />
  </main>
</template>