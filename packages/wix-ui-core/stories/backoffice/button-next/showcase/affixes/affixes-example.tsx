export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui/button-next";
import Sound from "wix-ui/icons/Sound";

export default () => (
  <React.Fragment>
    <ButtonNext prefixIcon={<Sound />}>prefix</ButtonNext>
    <ButtonNext suffixIcon={<Sound />}>suffix</ButtonNext>
    <ButtonNext prefixIcon={<Sound />} suffixIcon={<Sound />}>
      both
    </ButtonNext>
  </React.Fragment>
);`;
