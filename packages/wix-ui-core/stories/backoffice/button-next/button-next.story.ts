import { ButtonNext } from "./button-next";
import { Examples } from "./showcase/showcase";

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

  examples: Examples
};
