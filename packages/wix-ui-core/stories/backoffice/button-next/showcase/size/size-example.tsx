export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import { buttonNext } from "wix-ui-core/themes/backoffice";

export default () => (
  <React.Fragment>
    <ButtonNext className={buttonNext('tiny')}>tiny</ButtonNext>
    <ButtonNext className={buttonNext('small')}>small</ButtonNext>
    <ButtonNext className={buttonNext('medium')}>medium</ButtonNext>
    <ButtonNext className={buttonNext('large')}>large</ButtonNext>
  </React.Fragment>
);`;
