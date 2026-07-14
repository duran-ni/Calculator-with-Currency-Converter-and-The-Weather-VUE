<script setup>
import CalculatorButton from './CalculatorButton.vue'

defineEmits(['number', 'operator', 'equal', 'clear'])
</script>

<template>
  <div class="calculator-keypad">
    <CalculatorButton
      label="CE"
      variant="clear"
      class="calculator-keypad__full-row"
      @press="$emit('clear')"
    />

    <CalculatorButton label="7" @press="$emit('number', '7')" />
    <CalculatorButton label="8" @press="$emit('number', '8')" />
    <CalculatorButton label="9" @press="$emit('number', '9')" />
    <CalculatorButton label="÷" variant="operator" @press="$emit('operator', '/')" />

    <CalculatorButton label="4" @press="$emit('number', '4')" />
    <CalculatorButton label="5" @press="$emit('number', '5')" />
    <CalculatorButton label="6" @press="$emit('number', '6')" />
    <CalculatorButton label="×" variant="operator" @press="$emit('operator', '*')" />

    <CalculatorButton label="1" @press="$emit('number', '1')" />
    <CalculatorButton label="2" @press="$emit('number', '2')" />
    <CalculatorButton label="3" @press="$emit('number', '3')" />
    <CalculatorButton label="−" variant="operator" @press="$emit('operator', '-')" />

    <CalculatorButton label="0" @press="$emit('number', '0')" />
    <CalculatorButton label="." @press="$emit('number', '.')" />
    <CalculatorButton label="=" variant="equal" @press="$emit('equal')" />
    <CalculatorButton label="+" variant="operator" @press="$emit('operator', '+')" />
  </div>
</template>

<style lang="scss" scoped>
.calculator-keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;

  &__full-row {
    grid-column: span 4;
  }
}
</style>