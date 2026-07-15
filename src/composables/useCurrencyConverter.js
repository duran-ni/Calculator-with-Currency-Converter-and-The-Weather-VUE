import { ref } from 'vue'
import axios from 'axios'

const API_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest'

// Composable que encapsula el estado y la lógica del conversor de divisas.
// Usa CurrencyFreaks (base fija en USD en el plan gratuito) y calcula
// el cruce de tasas manualmente para convertir entre dos divisas cualesquiera.
export function useCurrencyConverter() {
  const amount = ref(0)
  const fromCurrency = ref('EUR')
  const toCurrency = ref('USD')
  const result = ref(null)
  const rate = ref(null)
  const loading = ref(false)
  const error = ref(null)
  

  async function convert() {
    error.value = null

    // Si origen y destino son iguales, el resultado es el mismo importe
    if (fromCurrency.value === toCurrency.value) {
      rate.value = 1
      result.value = amount.value
      return
    }

    loading.value = true

    try {
      const response = await axios.get(API_URL, {
        params: {
          apikey: import.meta.env.VITE_CURRENCYFREAKS_API_KEY,
          symbols: `${fromCurrency.value},${toCurrency.value}`
        }
      })

      const rates = response.data.rates
      const rateFrom = Number(rates[fromCurrency.value])
      const rateTo = Number(rates[toCurrency.value])

      // Ambas tasas vienen respecto a 1 USD (base fija del plan gratuito).
      // Cruzamos: 1 unidad de "from" equivale a (rateTo / rateFrom) unidades de "to".
      rate.value = rateTo / rateFrom
      result.value = amount.value * rate.value
    } catch (err) {
      error.value = 'No se pudo obtener el tipo de cambio. Inténtalo de nuevo.'
      result.value = null
      rate.value = null
    } finally {
      loading.value = false
    }
  }

  // Invierte las divisas de origen y destino (botón ⇅)
  function swap() {
    const temp = fromCurrency.value
    fromCurrency.value = toCurrency.value
    toCurrency.value = temp
  }

  return { amount, fromCurrency, toCurrency, result, rate, loading, error, convert, swap }
}