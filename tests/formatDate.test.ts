import { describe, it, expect } from 'vitest';
import formatDate from '@/utils/formatDate';


describe('formatDate', () => {
  it('should format a date string into "YYYY-MM-DD HH:mm"', () => {
    const result = formatDate('2024-01-01T15:30:00');
    expect(result).toBe('2024-01-01 15:30');
  });
});

