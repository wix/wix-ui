import hexToRgb from '.';

describe('HexToRgb', () => {
  const redHex =  '#FF0000';
  const opacity = 0.3;

  it('should convert color from hex to rgba without opacity', () => {
    const redRgbaWithoutOpacity = 'rgba(255,0,0,1)';
    const resultRgb = hexToRgb(redHex);
    expect(resultRgb).toEqual(redRgbaWithoutOpacity);
  });

  it('should convert color from hex to rgba with opacity', () => {
    const redRgbaWithOpacity = 'rgba(255,0,0,0.3)';
    const resultRgb = hexToRgb(redHex);
    expect(resultRgb).toEqual(redRgbaWithOpacity);
  });

  it('should throw an error when given incorrect hex color', () => {
    const badColorHex = 'FF0000';
    const errorMsg = 'Bad Hex Color';
    expect(() => hexToRgb(badColorHex , opacity)).toThrow(errorMsg);
  });
});
