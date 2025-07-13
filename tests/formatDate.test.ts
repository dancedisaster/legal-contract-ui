// tests/formatDate.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate } from '@/utils/formatDate'

describe('formatDate', () => {
  it('should format a date string into "YYYY-MM-DD HH:mm"', () => {
    const input = '2025-07-13T14:38:00Z'
    const output = formatDate(input)

    expect(output).toMatch(/2025-07-13 \d{2}:\d{2}/)
  })
})


