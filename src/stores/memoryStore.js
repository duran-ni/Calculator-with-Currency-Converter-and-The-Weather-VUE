import { defineStore } from 'pinia'

// Store de Pinia para el extra M+ / MR / MC de la calculadora.
// Guarda un único valor numérico en memoria, accesible desde
// cualquier componente mientras dure la sesión.
export const useMemoryStore = defineStore('memory', {
  state: () => ({
    value: null
  }),

  actions: {
    save(newValue) {
      this.value = newValue
    },

    clear() {
      this.value = null
    }
  }
})