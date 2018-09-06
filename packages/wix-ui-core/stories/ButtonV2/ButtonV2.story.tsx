import { ButtonV2 } from "../../src/components/ButtonV2/";

export default {
  category: "Components",
  storyName: "ButtonV2",
  component: ButtonV2,
  componentPath: "../../src/components/ButtonV2/buttonv2.tsx",

  componentProps: {
    disabled: false,
    children: "I'm a Button!",
    "data-hook": "storybook-buttonv2"
  },

  exampleProps: {
    onClick: () => "Clicked!"
  }
};
