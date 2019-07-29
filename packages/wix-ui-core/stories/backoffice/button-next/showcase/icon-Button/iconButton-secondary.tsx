import * as React from 'react';

import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { iconButton } from '../../../../../src/themes/backoffice';
import More from 'wix-ui-icons-common/More';

const exampleSecondary = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { iconButton } from "wix-ui-core/themes/backoffice";
import More from "wix-ui-icons-common/More";

export default () => (
  <React.Fragment>
    <ButtonNext className={iconButton("secondary")}>
      <More width="24" height="24" />
    </ButtonNext>
    <ButtonNext className={iconButton("light", "secondary")}>
      <More width="24" height="24"/>
    </ButtonNext>
    <ButtonNext className={iconButton("transparent", "secondary")}>
      <More width="24" height="24"/>
    </ButtonNext>
  </React.Fragment>
);`;

const secondaryDescription = (
  <div>
    Secondary skins <code>standard</code> , <code>light</code> and <code>transparent</code>.
  </div>
);

interface IconButtonSecondaryProps {
  style?: object;
}

export const IconButtonSecondary = ({ style }: IconButtonSecondaryProps) => (
  <CodeShowcase
    title="Icon Buttons (secondary)"
    style={style}
    code={exampleSecondary}
    description={secondaryDescription}
  >
    <ButtonNext className={iconButton('secondary')}>
      <More width="24" height="24" />
    </ButtonNext>
    <div
      style={{
        background: 'rgb(91, 127, 164)',
        padding: '2px'
      }}
    >
      <ButtonNext className={iconButton('light', 'secondary')}>
        <More width="24" height="24" />
      </ButtonNext>
    </div>
      <div
          style={{
              background: '#3899ec',
              padding: '2px'
          }}
      >
        <ButtonNext className={iconButton("transparent", "secondary")}>
           <More width="24" height="24"/>
        </ButtonNext>
    </div>
  </CodeShowcase>
);
