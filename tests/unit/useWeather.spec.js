import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { useWeather } from '../../src/composables/useWeather'

vi.mock('axios')

describe('useWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('trae el tiempo nacional (Madrid) por defecto', async () => {
    axios.get.mockResolvedValue({
      data: {
        ciudades: [
          { name: 'Madrid', stateSky: { description: 'Despejado', id: '11' }, temperatures: { max: '35', min: '22' } },
          { name: 'Barcelona', stateSky: { description: 'Intervalos nubosos', id: '13' }, temperatures: { max: '35', min: '24' } }
        ]
      }
    })

    const { city, fetchWeather } = useWeather()

    await fetchWeather()

    expect(city.value.name).toBe('Madrid')
    expect(city.value.skyId).toBe('11')
  })

  it('cambia a una provincia y trae la capital de la provincia (Oviedo)', async () => {
    axios.get.mockResolvedValue({
      data: {
        provincia: { CAPITAL_PROVINCIA: 'Oviedo' },
        ciudades: [
          { name: 'Oviedo', stateSky: { description: 'Cubierto con lluvia', id: '26' }, temperatures: { max: '25', min: '19' } },
          { name: 'Gijón', stateSky: { description: 'Muy nuboso con lluvia escasa', id: '45' }, temperatures: { max: '26', min: '20' } }
        ]
      }
    })

    const { city, setScope } = useWeather()

     await setScope('33')

    expect(city.value.name).toBe('Oviedo')
  })

  it('marca loading en true durante la petición y en false al terminar', async () => {
    let resolvePromise
    axios.get.mockReturnValue(new Promise((resolve) => { resolvePromise = resolve }))

    const { loading, fetchWeather } = useWeather()

    const fetchPromise = fetchWeather()
    expect(loading.value).toBe(true)

    resolvePromise({
      data: { ciudades: [{ name: 'Madrid', stateSky: { description: 'Despejado', id: '11' }, temperatures: { max: '20', min: '10' } }] }
    })
    await fetchPromise

    expect(loading.value).toBe(false)
  })

  it('muestra un error si la API falla, sin inventar datos', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'))

    const { city, error, fetchWeather } = useWeather()

    await fetchWeather()

    expect(error.value).toBeTruthy()
    expect(city.value).toBeNull()
  })
})