<script setup>
import CalculatorButton from './CalculatorButton.vue'

defineEmits(['memory-add', 'memory-recall', 'memory-clear'])
</script>

<template>
  <div class="calculator-memory">
    <CalculatorButton label="M+" variant="memory" @press="$emit('memory-add')" />
    <CalculatorButton label="MR" variant="memory" @press="$emit('memory-recall')" />
    <CalculatorButton label="MC" variant="memory" @press="$emit('memory-clear')" />
  </div>
</template>

<style lang="scss" scoped>
.calculator-memory {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>