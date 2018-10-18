export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import Sound from "wix-ui-icons-common/Sound";

export default () => (
  <React.Fragment>
    <ButtonNext prefixIcon={<Sound />}>prefix</ButtonNext>
    <ButtonNext suffixIcon={<Sound />}>suffix</ButtonNext>
    <ButtonNext prefixIcon={<Sound />} suffixIcon={<Sound />}>
      both
    </ButtonNext>
  </React.Fragment>
);`;
