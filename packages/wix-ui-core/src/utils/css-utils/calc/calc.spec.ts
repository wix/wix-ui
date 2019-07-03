import * as calc from './index';

describe('calc mixin', () => {
  it('should calculate an expression with no units', () => {
    expect(calc('12 / 2')).toBe('6');
    expect(calc(' 12 / 2')).toBe('6');
    expect(calc('12/2')).toBe('6');
  });

  it('should infer the unit typed value when have values with some unit and some without units', () => {
    expect(calc('12% / 2')).toBe('6%');
    expect(calc('12 / 2%')).toBe('6%');
    expect(calc(' 12/ 2%')).toBe('6%');
  });

  it('should calculate an expression with same units', () => {
    expect(calc('12px / 2px')).toBe('6px');
    expect(calc('12% / 2%')).toBe('6%');
    expect(calc('12%/2%')).toBe('6%');
  });

  it('should return an expression with native calc function when there are various units', () => {
    expect(calc('12% / 2px')).toBe('calc(12% / 2px)');
  });
});
