import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import Weather from '../../src/components/weather/Weather.vue'
import { useWeather } from '../../src/composables/useWeather'

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

  it('llama a setScope("nacional") al pulsar el botón Nacional', async () => {
    const mocked = mockWeather()

    const wrapper = mount(Weather)
    const button = wrapper.findAll('button').find((b) => b.text() === 'Nacional')
    await button.trigger('click')

    expect(mocked.setScope).toHaveBeenCalledWith('nacional')
  })

  it('llama a setScope("asturias") al pulsar el botón Asturias', async () => {
    const mocked = mockWeather()

    const wrapper = mount(Weather)
    const button = wrapper.findAll('button').find((b) => b.text() === 'Asturias')
    await button.trigger('click')

    expect(mocked.setScope).toHaveBeenCalledWith('asturias')
  })

  it('marca el botón "Nacional" como activo cuando scope es "nacional"', () => {
    mockWeather({ scope: ref('nacional') })

    const wrapper = mount(Weather)
    const button = wrapper.findAll('button').find((b) => b.text() === 'Nacional')

    expect(button.classes()).toContain('weather__scope-button--active')
  })

  it('marca el botón "Asturias" como activo cuando scope es "asturias"', () => {
    mockWeather({ scope: ref('asturias') })

    const wrapper = mount(Weather)
    const button = wrapper.findAll('button').find((b) => b.text() === 'Asturias')

    expect(button.classes()).toContain('weather__scope-button--active')
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
        stateSky: { description: 'Despejado', id: '11' },
        temperatures: { max: '35', min: '22' }
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
      city: ref({ name: 'Madrid', stateSky: { description: 'Despejado', id: '11' }, temperatures: { max: '35', min: '22' } }),
      loading: ref(true)
    })

    const wrapper = mount(Weather)

    expect(wrapper.find('.weather__body').exists()).toBe(false)
  })

  it('no muestra los datos de la ciudad si hay un error', () => {
    mockWeather({
      city: ref({ name: 'Madrid', stateSky: { description: 'Despejado', id: '11' }, temperatures: { max: '35', min: '22' } }),
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