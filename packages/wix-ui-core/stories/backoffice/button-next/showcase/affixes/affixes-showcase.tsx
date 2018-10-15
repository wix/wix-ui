import * as React from "react";

import Sound from "wix-ui-icons-common/Sound";
import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../../src/components/button-next";
import { backofficeTheme } from "../../../../../src/themes/backoffice";
import { example } from "./affixes-example";

const description = (
  <div>
    Suffix and prefix icons can be added to a button by setting
    <code>prefixIcon</code> or <code>suffixIcon</code> props.
  </div>
);

interface AffixesProps {
  style?: object;
}

const Affixes = ({ style }: AffixesProps) => (
  <CodeShowcase
    title="Affixes"
    style={style}
    code={example}
    theme={backofficeTheme}
    description={description}
  >
    <ButtonNext prefixIcon={<Sound />}>prefix</ButtonNext>
    <ButtonNext suffixIcon={<Sound />}>suffix</ButtonNext>
    <ButtonNext prefixIcon={<Sound />} suffixIcon={<Sound />}>
      both
    </ButtonNext>
  </CodeShowcase>
);

export default Affixes;
