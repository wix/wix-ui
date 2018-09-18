import { ButtonNext } from "./";

export default {
  category: "Components",
  storyName: "ButtonNext",
  component: ButtonNext,
  componentPath: "./button-next.tsx",

  componentProps: {
    disabled: true,
    children: "I'm a Button!",
    "data-hook": "storybook-button"
  },

  exampleProps: {
    onClick: () => "Clicked!"
  }
};
