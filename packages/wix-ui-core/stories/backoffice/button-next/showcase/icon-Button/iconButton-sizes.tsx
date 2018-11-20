import * as React from 'react';

import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { backofficeTheme } from '../../../../../src/themes/backoffice';
import { iconButton } from '../../../../../src/themes/backoffice';
import More from 'wix-ui-icons-common/More';

const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { iconButton } from "wix-ui-core/themes/backoffice";
import More from "wix-ui-icons-common/More";

export default () => (
  <React.Fragment>
    <ButtonNext className={iconButton("small")}>
      <More width="24" height="24" />
    </ButtonNext>
    <ButtonNext className={iconButton()}>
      <More width="24" height="24" />
    </ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    IconButton supports only <code>small</code> and <code>medium</code> sizes.
    The default value is <code>medium</code>
  </div>
);

interface IconButtonSizesProps {
  style?: object;
}

export const IconButtonSizes = ({ style }: IconButtonSizesProps) => (
  <CodeShowcase
    title="Icon Buttons (sizes)"
    style={style}
    code={example}
    description={description}
  >
    <ButtonNext className={iconButton('small')}>
      <More width="24" height="24" />
    </ButtonNext>
    <ButtonNext className={iconButton()}>
      <More width="24" height="24" />
    </ButtonNext>
  </CodeShowcase>
);
