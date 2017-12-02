import * as Wix from 'Wix';
import * as _color from 'color';

export const theme = ({backgroundColor, fonts, color}) => {
  const style = Wix.Styles.getStyleParams();
  const buttonColor = style.colors[backgroundColor].value;
  const buttonFonts = style.fonts[fonts];

  return {
    fontSize: buttonFonts.size,
    fontFamily: buttonFonts.family,
    fontStyle: buttonFonts.style.italic ? 'italic' : 'normal',
    fontWeight: buttonFonts.style.bold ? 'bold' : 'normal',
    textDecoration: buttonFonts.style.underline ? 'underline' : 'none',

    backgroundColor: buttonColor,
    borderColor: buttonColor,
    color: style.colors[color].value,

    hover: {
      backgroundColor: _color(buttonColor).lighten(0.4).rgb().string(),
      borderColor: _color(buttonColor).lighten(0.4).rgb().string()
    }
  };
};
