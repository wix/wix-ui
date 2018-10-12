import { ButtonNext } from "./button-next";
import { Skins, Props } from "./showcase/showcase";

export default {
  category: "BackOffice",
  storyName: "ButtonNext",
  component: ButtonNext,
  componentPath: "./button-next.tsx",

  componentProps: {
    disabled: false,
    children: "I'm a Button!",
    "data-hook": "storybook-button"
  },

  exampleProps: {
    onClick: () => "Clicked!"
  },

  examples: [Skins, Props]
};
