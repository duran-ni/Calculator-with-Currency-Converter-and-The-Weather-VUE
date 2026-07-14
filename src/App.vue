<script setup>
// ⚠️ App.vue TEMPORAL solo para probar CalculatorButton de forma aislada.
// Se sustituirá por la composición real de la app en el siguiente paso.
import CalculatorButton from './components/calculator/CalculatorButton.vue'

function handlePress(label) {
  console.log('Botón pulsado:', label)
}
</script>

<template>
  <main style="padding: 2rem; display: flex; gap: 0.5rem;">
    <CalculatorButton label="7" @press="handlePress('7')" />
    <CalculatorButton label="+" variant="operator" @press="handlePress('+')" />
    <CalculatorButton label="=" variant="equal" @press="handlePress('=')" />
    <CalculatorButton label="CE" variant="clear" @press="handlePress('CE')" />
    <CalculatorButton label="M+" variant="memory" @press="handlePress('M+')" />
  </main>
</template>