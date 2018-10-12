export const example = `import * as React from "react";
import classNames from "classnames";
import { ButtonNext } from "wix-ui-core/button-next";
import { buttonNext } from "wix-ui-core/themes/backoffice";

const { premium, dark, light, transparent, destructive } = buttonNext;
const { secondary } = buttonNext;

const premiumSecondary = classNames(premium, secondary);
const darkSecondary = classNames(dark, secondary);
const lightSecondary = classNames(light, secondary);
const transparentSecondary = classNames(transparent, secondary);
const destructiveSecondary = classNames(destructive, secondary);

export default () => (
  <React.Fragment>
    <ButtonNext className={secondary}>standard</ButtonNext>
    <ButtonNext className={destructiveSecondary}>destructive</ButtonNext>
    <ButtonNext className={premiumSecondary}>premium</ButtonNext>
    <ButtonNext className={darkSecondary}>dark</ButtonNext>
    <ButtonNext className={lightSecondary}>light</ButtonNext>
    <ButtonNext className={transparentSecondary}>transparent</ButtonNext>
  </React.Fragment>
);`;
