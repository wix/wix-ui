export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import { buttonNext } from "wix-ui-core/themes/backoffice";

const premiumSecondary = buttonNext('premium', 'secondary');
const darkSecondary = buttonNext('dark', 'secondary');
const lightSecondary = buttonNext('light', 'secondary');
const transparentSecondary = buttonNext('transparent, 'secondary');
const destructiveSecondary = buttonNext('destructive', 'secondary');

export default () => (
  <React.Fragment>
    <ButtonNext className={buttonNext('secondary')}>default</ButtonNext>
    <ButtonNext className={destructiveSecondary}>destructive</ButtonNext>
    <ButtonNext className={premiumSecondary}>premium</ButtonNext>
    <ButtonNext className={darkSecondary}>dark</ButtonNext>
    <ButtonNext className={lightSecondary}>light</ButtonNext>
    <ButtonNext className={transparentSecondary}>transparent</ButtonNext>
  </React.Fragment>
);`;
