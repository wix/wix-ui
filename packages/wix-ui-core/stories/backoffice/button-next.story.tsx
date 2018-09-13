import { ButtonNext } from "./button-next";
import { Sizes, Skins, Misq } from "./Examples/Examples";

export default {
  category: "BackOffice",
  storyName: "ButtonNext",
  component: ButtonNext,
  componentPath: "../../../src/components/button-next/button-next.tsx",

  componentProps: {
    disabled: false,
    children: "I'm a Button!",
    "data-hook": "storybook-button"
  },

  exampleProps: {
    onClick: () => "Clicked!"
  },

  examples: [Sizes, Skins, Misq]
};
