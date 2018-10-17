export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui";
import { buttonNext } from "wix-ui/themes/backoffice";

const { premium, dark, light, transparent, destructive } = buttonNext;
const { inverted } = buttonNext;

export default () => (
  <React.Fragment>
    <ButtonNext>standard</ButtonNext>
    <ButtonNext className={inverted}>inverted</ButtonNext>
    <ButtonNext className={destructive}>destructive</ButtonNext>
    <ButtonNext className={premium}>premium</ButtonNext>
    <ButtonNext className={dark}>dark</ButtonNext>
    <ButtonNext className={light}>light</ButtonNext>
    <ButtonNext className={transparent}>transparent</ButtonNext>
  </React.Fragment>
);
`;
