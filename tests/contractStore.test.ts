import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useContractStore } from '@/stores/contractStore'

describe('contractStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with an empty contracts list', () => {
    const store = useContractStore()
    expect(store.contracts).toEqual([])
  })

  it('can set the current page', () => {
    const store = useContractStore()
    store.currentPage = 2
    expect(store.currentPage).toBe(2)
  })
})