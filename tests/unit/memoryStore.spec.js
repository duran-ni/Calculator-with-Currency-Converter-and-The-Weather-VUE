import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMemoryStore } from '../../src/stores/memoryStore'

describe('useMemoryStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('empieza sin ningún valor guardado', () => {
    const store = useMemoryStore()
    expect(store.value).toBe(null)
  })

  it('guarda un valor con save()', () => {
    const store = useMemoryStore()
    store.save(42)
    expect(store.value).toBe(42)
  })

  it('borra el valor guardado con clear()', () => {
    const store = useMemoryStore()
    store.save(42)
    store.clear()
    expect(store.value).toBe(null)
  })
})