import * as _color from 'color';

export const theme = ({wixBindings, colors, fonts}) => {
  const buttonBgColor = colors[wixBindings.backgroundColor].value;
  const buttonColor = colors[wixBindings.color].value;
  const buttonFonts = fonts[wixBindings.fonts];

  return {
    fontSize: buttonFonts.size,
    fontFamily: buttonFonts.family,
    fontStyle: buttonFonts.style.italic ? 'italic' : 'normal',
    fontWeight: buttonFonts.style.bold ? 'bold' : 'normal',
    textDecoration: buttonFonts.style.underline ? 'underline' : 'none',

    backgroundColor: buttonBgColor,
    borderColor: buttonBgColor,
    color: buttonColor,

    hover: {
      backgroundColor: _color(buttonBgColor).lighten(0.4).rgb().string(),
      borderColor: _color(buttonBgColor).lighten(0.4).rgb().string()
    }
  };
};
