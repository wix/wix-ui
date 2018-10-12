export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { buttonNext } from "wix-ui-core/themes/backoffice";

const { premium, dark, light, transparent, destructive } = buttonNext;

export default () => (
  <React.Fragment>
    <ButtonNext>standard</ButtonNext>
    <ButtonNext className={destructive}>destructive</ButtonNext>
    <ButtonNext className={premium}>premium</ButtonNext>
    <ButtonNext className={dark}>dark</ButtonNext>
    <ButtonNext className={light}>light</ButtonNext>
    <ButtonNext className={transparent}>transparent</ButtonNext>
  </React.Fragment>
);
`;
