import * as Wix from 'Wix';
import * as color from 'color';

export const theme = ({backgroundColor}) => {
  const style = Wix.Styles.getStyleParams();
  const buttonColor = style.colors[backgroundColor].value;

  return {
    backgroundColor: buttonColor,
    backgroundColorHover: color(buttonColor).lighten(0.9).rgb().string(),
    backgroundColorChecked: color(buttonColor).lighten(0.6).rgb().string(),

    toggleIconDisplay: 'block',
    color: buttonColor,
    colorHover: color(buttonColor).lighten(0.9).rgb().string()
  };
};
