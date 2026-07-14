<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "default", // 'default' | 'operator' | 'equal' | 'clear' | 'memory'
  },
});

defineEmits(["press"]);
</script>

<template>
  <button
    class="calculator-button"
    :class="`calculator-button--${variant}`"
    type="button"
    @click="$emit('press')"
  >
    {{ label }}
  </button>
</template>

<style lang="scss" scoped>
.calculator-button {
  border: 1px solid #d5dbe2;
  border-radius: 10px;
  padding: 1rem 0;
  font-size: 1.1rem;
  background: #eef1f4;
  color: var(--color-text);
  transition: transform 0.05s ease;

  &:active {
    transform: scale(0.95);
  }

  &--operator {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: #fff;
  }

  &--equal {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #fff;
  }

  &--clear {
    background: var(--color-error);
    border-color: var(--color-error);
    color: #fff;
  }

  &--memory {
    background: #99ecbd;
    border-color: #9fb0c4;
    color: var(--color-text);
    font-size: 0.85rem;
    font-weight: 600;
  }
}
</style>
