import { describe, it, expect } from 'vitest'
import { mapWeatherCity } from '../../src/models/weatherModel'

describe('mapWeatherCity', () => {
  it('convierte una ciudad cruda de la API en el modelo interno', () => {
    const rawCity = {
      name: 'Madrid',
      stateSky: { description: 'Despejado', id: '11' },
      temperatures: { max: '35', min: '22' }
    }

    const result = mapWeatherCity(rawCity)

    expect(result).toEqual({
      name: 'Madrid',
      skyId: '11',
      skyDescription: 'Despejado',
      maxTemp: 35,
      minTemp: 22
    })
  })
})