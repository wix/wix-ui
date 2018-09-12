import { ButtonV2 } from "../../src/components/Button-v2/";

export default {
  category: "Components",
  storyName: "ButtonV2",
  component: ButtonV2,
  componentPath: "../../src/components/Button-v2/button-v2.tsx",

  componentProps: {
    disabled: false,
    children: "I'm a Button!",
    "data-hook": "storybook-button"
  },

  exampleProps: {
    onClick: () => "Clicked!"
  }
};
