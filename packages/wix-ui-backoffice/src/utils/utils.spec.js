import {hexToRgba} from './';

describe('hexToRgba function', () => {
  it('should transform hex to Rgba', () => {
    const opacity = 0;
    expect(hexToRgba('#4af441', opacity)).toBe(`rgba(74, 244, 65, ${opacity})`);
  });
});
