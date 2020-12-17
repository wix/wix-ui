import { generateDataAttr } from './generateDataAttr';

describe('generateDataAttr', () => {
  it('should return data attributes [when] given props & filter', () => {
    const props = { skin: 'dark' };

    const result = generateDataAttr(props, ['skin']);

    expect(result).toEqual({ 'data-skin': 'dark' });
  });

  it('should return empty object [when] given only props', () => {
    const props = { skin: 'dark' };

    const result = generateDataAttr(props);

    expect(result).toEqual({});
  });

  it('should return empty object [when] given empty props', () => {
    const props = {};

    const result = generateDataAttr(props, ['skin']);

    expect(result).toEqual({});
  });

  it('should return data attributes [when] given values with booleans', () => {
    const props = {
      disabled: false,
    };

    const result = generateDataAttr(props, ['disabled']);

    expect(result).toEqual({ 'data-disabled': false });
  });

  it('should return lowercased data attributes', () => {
    const props = { testProp: 'test' };
    const result = generateDataAttr(props, ['testProp']);

    expect(result).toEqual({ 'data-testprop': 'test' });
  });
});
