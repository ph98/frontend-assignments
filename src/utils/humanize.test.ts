import humanize from './humanize';

describe('Humanize Function', () => {
  it('Convert 1200 correctly', () => {
    expect(humanize({ number: 1200 })).toBe('1.2K');
  });

  it('Convert -1200 correctly', () => {
    expect(humanize({ number: -1200 })).toBe('-1.2K');
  });

  it('Convert 0 correctly', () => {
    expect(humanize({ number: 0 })).toBe('0');
  });

  it('Convert 3 correctly', () => {
    expect(humanize({ number: 3 })).toBe('3');
  });

  it('Convert 3000001 correctly', () => {
    expect(humanize({ number: 3000001, fn: (n:number) => n.toFixed(2) })).toBe('3.00M');
    expect(humanize({ number: 3000001, fn: (n:number) => n.toFixed(0) })).toBe('3M');
  });

  it('Convert 3000000000000 correctly', () => {
    expect(humanize({ number: 3000000000000, fn: (n:number) => n.toFixed(2) })).toBe('3.00T');
    expect(humanize({ number: 3000000000000, fn: (n:number) => n.toFixed(0) })).toBe('3T');
  });
  it('Convert 3000000000000000000000 correctly', () => {
    expect(humanize({ number: 3000000000000000000000, fn: (n:number) => n.toFixed(2) })).toBe('3.00Z');
    expect(humanize({ number: 3000000000000000000000, fn: (n:number) => n.toFixed(0) })).toBe('3Z');
  });

  it('Convert -3000000000000000000000 correctly', () => {
    expect(humanize({ number: -3000000000000000000000, fn: (n:number) => n.toFixed(2) })).toBe('-3.00Z');
    expect(humanize({ number: -3000000000000000000000, fn: (n:number) => n.toFixed(0) })).toBe('-3Z');
  });
});
