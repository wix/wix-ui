import * as React from "react";
import CodeExample from "wix-storybook-utils/CodeExample";
import { ButtonTwo } from "../../../../src/components/ButtonV2";
import { button, backOfficeTheme } from "../../../../src/themes/backoffice";

export const Sizes = (
  <CodeExample>
    <div className={backOfficeTheme}>
      <ButtonTwo className={button.small}>small</ButtonTwo>
      <ButtonTwo className={button.medium}>medium</ButtonTwo>
      <ButtonTwo className={button.large}>large</ButtonTwo>
    </div>
  </CodeExample>
);

export const Skins = (
  <CodeExample title="Skins">
    <div className={backOfficeTheme}>
      <ButtonTwo>standard</ButtonTwo>
      <ButtonTwo className={button.premium}>premium</ButtonTwo>
      <ButtonTwo className={button.success}>sucess</ButtonTwo>
    </div>
  </CodeExample>
);

export const Misq = (
  <CodeExample title="Misq">
    <div className={backOfficeTheme}>
      <ButtonTwo className={button.disable}>Disable</ButtonTwo>
      <ButtonTwo className={button.error}>Error</ButtonTwo>
    </div>
  </CodeExample>
);
