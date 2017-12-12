import * as color from 'color';

export const theme = ({wixBindings, colors, fonts}) => {
  const buttonColor = colors[wixBindings.backgroundColor].value;

  return {
    backgroundColor: buttonColor,
    backgroundColorHover: color(buttonColor).lighten(0.9).rgb().string(),
    backgroundColorChecked: color(buttonColor).lighten(0.6).rgb().string(),

    toggleIconDisplay: 'block',
    color: buttonColor,
    colorHover: color(buttonColor).lighten(0.9).rgb().string()
  };
};
