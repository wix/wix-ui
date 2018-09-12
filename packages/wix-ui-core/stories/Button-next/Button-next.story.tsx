import { ButtonNext } from "../../src/components/Button-next/";

export default {
  category: "Components",
  storyName: "ButtonNext",
  component: ButtonNext,
  componentPath: "../../src/components/Button-next/button-next.tsx",

  componentProps: {
    disabled: false,
    children: "I'm a Button!",
    "data-hook": "storybook-button"
  },

  exampleProps: {
    onClick: () => "Clicked!"
  }
};
