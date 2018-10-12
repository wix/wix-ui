export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { buttonNext } from "wix-ui-core/themes/backoffice";

const { small, medium, large } = buttonNext;

export default () => (
  <React.Fragment>
    <ButtonNext className={small}>small</ButtonNext>
    <ButtonNext className={medium}>medium</ButtonNext>
    <ButtonNext className={large}>large</ButtonNext>
  </React.Fragment>
);`;
