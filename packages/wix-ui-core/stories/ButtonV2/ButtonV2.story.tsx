import { ButtonTwo } from "../../src/components/ButtonV2/";

export default {
  category: "Components",
  storyName: "ButtonTwo",
  component: ButtonTwo,
  componentPath: "../../src/components/ButtonV2/buttonTwo.tsx",

  componentProps: {
    disabled: false,
    children: "I'm a Button!",
    "data-hook": "storybook-button"
  },

  exampleProps: {
    onClick: () => "Clicked!"
  }
};
