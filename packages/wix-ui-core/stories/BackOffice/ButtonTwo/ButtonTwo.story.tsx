import * as React from "react";
import { ButtonTwo } from "../../../src/components/ButtonV2/";
import classNames from "classnames";
import { button, boTheme } from "../../../src/themes/backoffice/index";
import CodeExample from "wix-storybook-utils/CodeExample";

const Sizes = (
  <CodeExample title="Sizes">
    <div className={boTheme}>
      <ButtonTwo className={button.small}>small</ButtonTwo>
      <ButtonTwo className={button.medium}>medium</ButtonTwo>
      <ButtonTwo className={button.large}>large</ButtonTwo>
    </div>
  </CodeExample>
);

const Skins = (
  <CodeExample title="Skins">
    <div className={boTheme}>
      <ButtonTwo>standard</ButtonTwo>
      <ButtonTwo className={button.premium}>premium</ButtonTwo>
      <ButtonTwo className={button.success}>sucess</ButtonTwo>
    </div>
  </CodeExample>
);

const Misq = (
  <CodeExample title="Misq">
    <div className={boTheme}>
      <ButtonTwo className={button.disable}>Disable</ButtonTwo>
      <ButtonTwo className={button.error}>Error</ButtonTwo>
    </div>
  </CodeExample>
);

export default {
  category: "BackOffice",
  storyName: "ButtonTwo",
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
