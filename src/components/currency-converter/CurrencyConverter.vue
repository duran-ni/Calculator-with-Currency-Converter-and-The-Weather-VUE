<script setup>
import { useCurrencyConverter } from '../../composables/useCurrencyConverter'

const { amount, fromCurrency, toCurrency, result, rate, loading, error, convert, swap } = useCurrencyConverter()
</script>

<template>
  <section class="currency-converter" aria-label="Conversor de divisas">
    <h2 class="currency-converter__title">💱 Conversor de Divisas</h2>

    <div class="currency-converter__row">
      <input
        class="currency-converter__input"
        type="number"
        v-model.number="amount"
      />
      <select class="currency-converter__select" v-model="fromCurrency">
        <option value="EUR">€ Euro</option>
        <option value="USD">$ Dólar</option>
        <option value="JPY">¥ Yen</option>
      </select>
    </div>

    <div class="currency-converter__swap-row">
      <button
        class="currency-converter__swap"
        title="Invertir divisas"
        @click="swap"
      >
        ⇅
      </button>
    </div>

    <div class="currency-converter__row">
      <select class="currency-converter__select" v-model="toCurrency">
        <option value="EUR">€ Euro</option>
        <option value="USD">$ Dólar</option>
        <option value="JPY">¥ Yen</option>
      </select>
    </div>

    <button class="currency-converter__convert" @click="convert">Convertir</button>

    <p v-if="loading" class="currency-converter__loading">Cargando tipo de cambio…</p>
    <p v-if="error" class="currency-converter__error">{{ error }}</p>

    <div
      v-if="result !== null && !loading && !error"
      class="currency-converter__result"
    >
      <span>Resultado</span>
      <strong>{{ result.toFixed(2) }} {{ toCurrency }}</strong>
    </div>

    <p
      v-if="rate !== null && !loading && !error"
      class="currency-converter__rate"
    >
      1 {{ fromCurrency }} = {{ rate.toFixed(4) }} {{ toCurrency }} · Fuente: CurrencyFreaks
    </p>
  </section>
</template>

<style lang="scss" scoped>
.currency-converter {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-card);
  margin-top: var(--spacing-md);

  &__title {
    font-size: 0.95rem;
    margin: 0 0 var(--spacing-sm);
  }

  &__row {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }

  &__input,
  &__select {
    flex: 1;
    padding: var(--spacing-sm);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-text-muted);
    font-family: var(--font-family-base);
  }

  &__swap-row {
    text-align: center;
    margin-bottom: var(--spacing-sm);
  }

  &__swap {
    background: var(--color-primary);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    cursor: pointer;
  }

  &__convert {
    width: 100%;
    padding: var(--spacing-sm);
    border: none;
    border-radius: var(--radius-md);
    background: var(--color-primary);
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }

  &__loading,
  &__error {
    font-size: 0.85rem;
    margin-top: var(--spacing-sm);
  }

  &__error {
    color: var(--color-error);
  }

  &__result {
    margin-top: var(--spacing-sm);
    background: var(--color-background);
    border-radius: var(--radius-md);
    padding: var(--spacing-sm);
    display: flex;
    justify-content: space-between;
  }

  &__rate {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin-top: var(--spacing-xs);
  }
}
</style>