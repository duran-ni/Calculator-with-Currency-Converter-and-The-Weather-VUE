<script setup>
import { onMounted } from 'vue'
import { useWeather } from '../../composables/useWeather'
import { getSkyIcon } from '../../utils/skyIcons'
import { PROVINCIAS } from '../../models/provinces'

const { scope, city, loading, error, setScope, fetchWeather } = useWeather()

// Carga el tiempo nacional automáticamente al montar el componente,
// para que no aparezca vacío antes de que el usuario interactúe.
onMounted(() => {
  fetchWeather()
})
</script>

<template>
  <section class="weather" aria-label="El tiempo">
    <div class="weather__header">
      <h2 class="weather__title">☁️ El Tiempo</h2>
      <div class="weather__scope">
        <label class="weather__scope-label" for="weather-scope-select">Ámbito</label>
        <select
          id="weather-scope-select"
          class="weather__scope-select"
          :value="scope"
          @change="setScope($event.target.value)"
        >
          <option value="nacional">Nacional</option>
          <option
            v-for="provincia in PROVINCIAS"
            :key="provincia.codProv"
            :value="provincia.codProv"
          >
            {{ provincia.nombre }}
          </option>
        </select>
      </div>
    </div>

    <p v-if="loading" class="weather__loading">Cargando datos del tiempo…</p>

    <div v-if="error" class="weather__error">
      <p>{{ error }}</p>
      <button class="weather__retry" @click="fetchWeather">Reintentar</button>
    </div>

    <div v-if="city && !loading && !error" class="weather__body">
      <div class="weather__icon">{{ getSkyIcon(city.skyId) }}</div>
      <div class="weather__info">
        <p class="weather__city">{{ city.name }}</p>
        <p class="weather__temp">{{ city.maxTemp }}° / {{ city.minTemp }}°</p>
        <p class="weather__desc">{{ city.skyDescription }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.weather {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-card);
  margin-top: var(--spacing-md);

  &__header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-sm);
  }

  &__title {
    font-size: 0.95rem;
    margin: 0;
  }

  &__scope {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  &__scope-label {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  &__scope-select {
    border: 1px solid var(--color-primary);
    background: transparent;
    color: var(--color-primary);
    border-radius: var(--radius-md);
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    cursor: pointer;
  }

  &__body {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  &__icon {
    font-size: 2rem;
    line-height: 1;
  }

  &__city {
    margin: 0;
    font-weight: 600;
  }

  &__temp {
    margin: 0.15rem 0 0;
    font-size: 1.1rem;
  }

  &__desc {
    margin: 0.15rem 0 0;
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }

  &__loading {
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }

  &__error {
    font-size: 0.85rem;
    color: var(--color-error);
  }

  &__retry {
    margin-top: var(--spacing-xs);
    border: 1px solid var(--color-error);
    background: transparent;
    color: var(--color-error);
    border-radius: var(--radius-md);
    padding: 0.3rem 0.8rem;
    cursor: pointer;
  }
}
</style>