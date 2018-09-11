import { ButtonTwo } from "./ButtonTwo";
import { Sizes, Skins, Misq } from "./Examples/Examples";

export default {
  category: "BackOffice",
  storyName: "Buttons",
  component: ButtonTwo,
  componentPath: "../../../src/components/ButtonV2/buttonTwo.tsx",

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
