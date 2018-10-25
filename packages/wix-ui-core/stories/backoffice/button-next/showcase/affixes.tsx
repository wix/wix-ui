import * as React from "react";

import Add from "wix-ui-icons-common/Add";
import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../src/components/button-next";
import { backofficeTheme } from "../../../../src/themes/backoffice";

const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import Add from "wix-ui-icons-common/Add";

export default () => (
  <React.Fragment>
    <ButtonNext prefixIcon={<Add />}>prefix</ButtonNext>
    <ButtonNext suffixIcon={<Add />}>suffix</ButtonNext>
  </React.Fragment>
);`;

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
    <ButtonNext prefixIcon={<Add />}>prefix</ButtonNext>
    <ButtonNext suffixIcon={<Add />}>suffix</ButtonNext>
  </CodeShowcase>
);

export default Affixes;
