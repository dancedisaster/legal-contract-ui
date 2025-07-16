// tests/setup.ts
import { vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'


vi.mock('element-plus/theme-chalk/base.css', () => ({}))

beforeEach(() => {
  setActivePinia(createPinia())
})

// Mock Element Plus CSS
vi.mock('element-plus/theme-chalk/base.css', () => ({}))
vi.mock('element-plus/dist/index.css', () => ({}))
