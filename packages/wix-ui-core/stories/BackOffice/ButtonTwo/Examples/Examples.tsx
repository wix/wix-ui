import * as React from "react";
import CodeShowcase from "wix-storybook-utils/dist/src/CodeShowcase/CodeShowcase";
import { ButtonTwo } from "../../../../src/components/ButtonV2";
import { button, backOfficeTheme } from "../../../../src/themes/backoffice";

export const Sizes = (
  <CodeShowcase title="Size" code="">
    <div className={backOfficeTheme}>
      <ButtonTwo className={button.small}>small</ButtonTwo>
      <ButtonTwo className={button.medium}>medium</ButtonTwo>
      <ButtonTwo className={button.large}>large</ButtonTwo>
    </div>
  </CodeShowcase>
);

export const Skins = (
  <CodeShowcase title="Skins" code="">
    <div className={backOfficeTheme}>
      <ButtonTwo>standard</ButtonTwo>
      <ButtonTwo className={button.premium}>premium</ButtonTwo>
      <ButtonTwo className={button.success}>sucess</ButtonTwo>
    </div>
  </CodeShowcase>
);

export const Misq = (
  <CodeShowcase title="Misq" code="">
    <div className={backOfficeTheme}>
      <ButtonTwo className={button.disable}>Disable</ButtonTwo>
      <ButtonTwo error>Error</ButtonTwo>
    </div>
  </CodeShowcase>
);
