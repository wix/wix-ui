export const theme = ({wixBindings, colors, fonts}) => {
  const textColor = colors[wixBindings.backgroundColor].value;
  const textFonts = fonts[wixBindings.fonts];

  return {
    fontSize: textFonts.size,
    fontFamily: textFonts.family,
    lineHeight: textFonts.lineHeight,
    color: textColor,
  };
};
