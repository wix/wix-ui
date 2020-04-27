import * as React from 'react';

import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { iconButton } from '../../../../../src/themes/backoffice';
import More from 'wix-ui-icons-common/More';

const examplePrimary = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import { iconButton } from "wix-ui-core/themes/backoffice";
import More from "wix-ui-icons-common/More";

export default () => (
  <React.Fragment>
   <ButtonNext className={iconButton()}>
      <More width="24" height="24" />
   </ButtonNext>
   <ButtonNext className={iconButton('light')}>
      <More width="24" height="24" />
   </ButtonNext>
   <ButtonNext className={iconButton('transparent')}>
      <More width="24" height="24" />
   </ButtonNext>
  </React.Fragment>
);`;

const descriptionPrimary = (
  <div>
    Primary skins <code>standard</code>, <code>light</code> and{' '}
    <code>transparent</code>.
  </div>
);

interface IconButtonPrimaryProps {
  style?: object;
}

export const IconButtonPrimary = ({ style }: IconButtonPrimaryProps) => (
  <CodeShowcase
    title="Icon Buttons (primary)"
    style={style}
    code={examplePrimary}
    description={descriptionPrimary}
  >
    <ButtonNext className={iconButton()}>
      <More width="24" height="24" />
    </ButtonNext>
    <div
      style={{
        background: 'rgb(91, 127, 164)',
        padding: '2px',
      }}
    >
      <ButtonNext className={iconButton('light')}>
        <More width="24" height="24" />
      </ButtonNext>
    </div>
    <ButtonNext className={iconButton('transparent')}>
      <More width="24" height="24" />
    </ButtonNext>
  </CodeShowcase>
);
