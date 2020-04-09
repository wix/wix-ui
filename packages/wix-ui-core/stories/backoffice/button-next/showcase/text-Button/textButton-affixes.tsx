import * as React from 'react';

import ChevronDown from 'wix-ui-icons-common/ChevronDown';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { textButton } from '../../../../../src/themes/backoffice';

const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { textButton } from "wix-ui-core/theme/backoffice";
import ChevronDown from "wix-ui-icons-common/ChevronDown";

export default () => (
  <React.Fragment>
    <ButtonNext className={textButton()} prefixIcon={<ChevronDown />}>
      prefix
    </ButtonNext>
    <ButtonNext className={textButton()} suffixIcon={<ChevronDown />}>
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

interface TextButtonAffixesProps {
  style?: object;
}
export const TextButtonAffixes = ({ style }: TextButtonAffixesProps) => (
  <CodeShowcase
    title="Text Buttons (affixes)"
    style={style}
    code={example}
    description={description}
  >
    <ButtonNext className={textButton()} prefixIcon={<ChevronDown />}>
      prefix
    </ButtonNext>
    <ButtonNext className={textButton()} suffixIcon={<ChevronDown />}>
      suffix
    </ButtonNext>
  </CodeShowcase>
);
