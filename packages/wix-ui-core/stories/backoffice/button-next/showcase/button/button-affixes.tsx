import * as React from 'react';

import Add from 'wix-ui-icons-common/Add';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { backofficeTheme, button } from '../../../../../src/themes/backoffice';

const example = `import * as React from "react";
import { ButtonNext, button } from "wix-ui-core/button-next";
import Add from "wix-ui-icons-common/Add";

export default () => (
  <React.Fragment>
    <ButtonNext className={button()} prefixIcon={<Add />}>
      prefix
    </ButtonNext>
    <ButtonNext className={button()} suffixIcon={<Add />}>
      suffix
    </ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    Suffix and prefix icons can be added to a button by setting
    <code>prefixIcon</code> or <code>suffixIcon</code> props.
  </div>
);

interface ButtonAffixesProps {
  style?: object;
}
export const ButtonAffixes = ({ style }: ButtonAffixesProps) => (
  <CodeShowcase
    title="Affixes"
    style={style}
    code={example}
    theme={backofficeTheme}
    description={description}
  >
    <ButtonNext className={button()} prefixIcon={<Add />}>
      prefix
    </ButtonNext>
    <ButtonNext className={button()} suffixIcon={<Add />}>
      suffix
    </ButtonNext>
  </CodeShowcase>
);
