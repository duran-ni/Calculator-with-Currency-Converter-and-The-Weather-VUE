import { ref } from 'vue'
import axios from 'axios'
import { mapWeatherCity } from '../models/weatherModel'

const NATIONAL_URL = 'https://api.el-tiempo.net/json/v3/general'
const NATIONAL_CITY = 'Madrid'

function provinceUrl(codProv) {
  return `https://api.el-tiempo.net/json/v3/provincias/${codProv}`
}

// Composable que encapsula el estado y la lógica del módulo "El Tiempo".
// "scope" vale 'nacional' o el código de una provincia (CODPROV, ej. '33').
export function useWeather() {
  const scope = ref('nacional')
  const city = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchWeather() {
    loading.value = true
    error.value = null

    try {
      const url = scope.value === 'nacional' ? NATIONAL_URL : provinceUrl(scope.value)
      const response = await axios.get(url)

      const cityName = scope.value === 'nacional'
        ? NATIONAL_CITY
        : response.data.provincia.CAPITAL_PROVINCIA

      const found = response.data.ciudades.find((c) => c.name === cityName)

      if (!found) {
        throw new Error('Ciudad no encontrada en la respuesta de la API')
      }

      city.value = mapWeatherCity(found)
    } catch (err) {
      error.value = 'No se pudo obtener el tiempo. Inténtalo de nuevo.'
      city.value = null
    } finally {
      loading.value = false
    }
  }

  // Cambia el ámbito (nacional/código de provincia) y vuelve a consultar la API automáticamente.
  function setScope(newScope) {
    scope.value = newScope
    return fetchWeather()
  }

  return { scope, city, loading, error, fetchWeather, setScope }
}