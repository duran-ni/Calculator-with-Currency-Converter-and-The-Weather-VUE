import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import Weather from '../../src/components/weather/Weather.vue'
import { useWeather } from '../../src/composables/useWeather'
import { PROVINCIAS } from '../../src/models/provinces'

vi.mock('../../src/composables/useWeather', () => ({
  useWeather: vi.fn()
}))

function mockWeather(overrides = {}) {
  const base = {
    scope: ref('nacional'),
    city: ref(null),
    loading: ref(false),
    error: ref(null),
    setScope: vi.fn(),
    fetchWeather: vi.fn()
  }
  const merged = { ...base, ...overrides }
  useWeather.mockReturnValue(merged)
  return merged
}

describe('Weather', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('llama a fetchWeather() automáticamente al montar', () => {
    const mocked = mockWeather()

    mount(Weather)

    expect(mocked.fetchWeather).toHaveBeenCalledOnce()
  })

  it('muestra un desplegable con la opción Nacional y las 52 provincias', () => {
    mockWeather()

    const wrapper = mount(Weather)
    const options = wrapper.findAll('option')

    expect(options).toHaveLength(1 + PROVINCIAS.length)
    expect(options[0].text()).toBe('Nacional')
  })

  it('el desplegable muestra seleccionado el scope actual', () => {
    mockWeather({ scope: ref('33') })

    const wrapper = mount(Weather)
    const select = wrapper.find('select')

    expect(select.element.value).toBe('33')
  })

  it('llama a setScope con el código de provincia al cambiar el desplegable', async () => {
    const mocked = mockWeather()

    const wrapper = mount(Weather)
    const select = wrapper.find('select')

    await select.setValue('33')

    expect(mocked.setScope).toHaveBeenCalledWith('33')
  })

  it('muestra el mensaje de carga cuando loading es true', () => {
    mockWeather({ loading: ref(true) })

    const wrapper = mount(Weather)

    expect(wrapper.find('.weather__loading').exists()).toBe(true)
  })

  it('muestra el error y permite reintentar', async () => {
    const mocked = mockWeather({ error: ref('No se pudo obtener el tiempo.') })

    const wrapper = mount(Weather)

    expect(wrapper.find('.weather__error').text()).toContain('No se pudo obtener el tiempo.')

    await wrapper.find('.weather__retry').trigger('click')

    expect(mocked.fetchWeather).toHaveBeenCalled()
  })

  it('muestra los datos de la ciudad cuando hay city y no hay loading ni error', () => {
    mockWeather({
      city: ref({
        name: 'Madrid',
        skyId: '11',
        skyDescription: 'Despejado',
        maxTemp: 35,
        minTemp: 22
      })
    })

    const wrapper = mount(Weather)

    expect(wrapper.find('.weather__city').text()).toBe('Madrid')
    expect(wrapper.find('.weather__temp').text()).toBe('35° / 22°')
    expect(wrapper.find('.weather__desc').text()).toBe('Despejado')
    expect(wrapper.find('.weather__icon').text()).toBe('☀️')
  })

  it('no muestra los datos de la ciudad si loading es true', () => {
    mockWeather({
      city: ref({ name: 'Madrid', skyId: '11', skyDescription: 'Despejado', maxTemp: 35, minTemp: 22 }),
      loading: ref(true)
    })

    const wrapper = mount(Weather)

    expect(wrapper.find('.weather__body').exists()).toBe(false)
  })

  it('no muestra los datos de la ciudad si hay un error', () => {
    mockWeather({
      city: ref({ name: 'Madrid', skyId: '11', skyDescription: 'Despejado', maxTemp: 35, minTemp: 22 }),
      error: ref('fallo')
    })

    const wrapper = mount(Weather)

    expect(wrapper.find('.weather__body').exists()).toBe(false)
  })

  it('no muestra los datos de la ciudad si city es null', () => {
    mockWeather({ city: ref(null) })

    const wrapper = mount(Weather)

    expect(wrapper.find('.weather__body').exists()).toBe(false)
  })
})