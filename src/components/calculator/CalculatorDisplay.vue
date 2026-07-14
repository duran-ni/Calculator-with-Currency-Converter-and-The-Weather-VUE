<script setup>
// Componente de presentación: recibe el valor principal y el histórico
// como props, y detecta si el valor principal es un mensaje de error
// para aplicar un estilo distinto 
import { computed } from 'vue'

const props = defineProps({
  mainValue: {
    type: String,
    required: true
  },
  historyValue: {
    type: String,
    default: ''
  }
})

const isError = computed(() => props.mainValue.startsWith('Error'))
</script>

<template>
  <div class="calculator-display">
    <p class="calculator-display__history">{{ historyValue }}</p>
    <p
      class="calculator-display__main"
      :class="{ 'calculator-display__main--error': isError }"
    >
      {{ mainValue }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.calculator-display {
  background: #1e2733;
  color: #fff;
  border-radius: 10px;
  padding: 1rem;
  text-align: right;
  margin-bottom: 0.75rem;

  &__history {
    font-size: 0.85rem;
    color: #9aa5b1;
    min-height: 1.1rem;
  }

  &__main {
    font-size: 2rem;
    font-weight: 600;
    word-break: break-all;

    &--error {
      font-size: 0.95rem;
      color: var(--color-error);
    }
  }
}
</style>