import * as React from "react";
import CodeShowcase from "wix-storybook-utils/dist/src/CodeShowcase/CodeShowcase";
import { ButtonTwo } from "../../../../src/components/ButtonV2";
import { button, backOfficeTheme } from "../../../../src/themes/backoffice";

const sizeExamples = `<ButtonTwo className={button.small}>small</ButtonTwo>
<ButtonTwo className={button.medium}>medium</ButtonTwo>
<ButtonTwo className={button.large}>large</ButtonTwo>`;

const skinExamples = `<ButtonTwo>standard</ButtonTwo>
<ButtonTwo className={button.premium}>premium</ButtonTwo>
<ButtonTwo className={button.success}>sucess</ButtonTwo>`;

const misqExamples = `<ButtonTwo disabled>standard</ButtonTwo>
<ButtonTwo error>premium</ButtonTwo>`;

export const Sizes = (
  <CodeShowcase title="Size" code={sizeExamples}>
    <div className={backOfficeTheme}>
      <ButtonTwo className={button.small}>small</ButtonTwo>
      <ButtonTwo className={button.medium}>medium</ButtonTwo>
      <ButtonTwo className={button.large}>large</ButtonTwo>
    </div>
  </CodeShowcase>
);

export const Skins = (
  <CodeShowcase title="Skins" code={skinExamples}>
    <div className={backOfficeTheme}>
      <ButtonTwo>standard</ButtonTwo>
      <ButtonTwo className={button.premium}>premium</ButtonTwo>
      <ButtonTwo className={button.success}>sucess</ButtonTwo>
    </div>
  </CodeShowcase>
);

export const Misq = (
  <CodeShowcase title="Misq" code={misqExamples}>
    <div className={backOfficeTheme}>
      <ButtonTwo disabled>Disabled</ButtonTwo>
      <ButtonTwo error>Error</ButtonTwo>
    </div>
  </CodeShowcase>
);
