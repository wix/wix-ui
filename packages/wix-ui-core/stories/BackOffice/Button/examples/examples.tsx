import * as React from "react";
import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../src/components/button-next";
import { buttonNext, backOfficeTheme } from "../../../../src/themes/backoffice";

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
      <ButtonNext className={buttonNext.small}>small</ButtonNext>
      <ButtonNext className={buttonNext.medium}>medium</ButtonNext>
      <ButtonNext className={buttonNext.large}>large</ButtonNext>
    </div>
  </CodeShowcase>
);

export const Skins = (
  <CodeShowcase title="Skins" code={skinExamples}>
    <div className={backOfficeTheme}>
      <ButtonNext>standard</ButtonNext>
      <ButtonNext className={buttonNext.premium}>premium</ButtonNext>
      <ButtonNext className={buttonNext.success}>sucess</ButtonNext>
    </div>
  </CodeShowcase>
);

export const Misq = (
  <CodeShowcase title="Misq" code={misqExamples}>
    <div className={backOfficeTheme}>
      <ButtonNext disabled>Disabled</ButtonNext>
      <ButtonNext error>Error</ButtonNext>
    </div>
  </CodeShowcase>
);
