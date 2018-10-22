export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import { buttonNext } from "wix-ui-core/themes/backoffice";

export default () => (
  <React.Fragment>
    <ButtonNext>default</ButtonNext>
    <ButtonNext className={buttonNext("inverted")}>inverted</ButtonNext>
    <ButtonNext className={buttonNext("destructive")}>destructive</ButtonNext>
    <ButtonNext className={buttonNext("premium")}>premium</ButtonNext>
    <ButtonNext className={buttonNext("dark")}>dark</ButtonNext>
    <ButtonNext className={buttonNext("light")}>light</ButtonNext>
    <ButtonNext className={buttonNext("transparent")}>transparent</ButtonNext>
  </React.Fragment>
);`;
