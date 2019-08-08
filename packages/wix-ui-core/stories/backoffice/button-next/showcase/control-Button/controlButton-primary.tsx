import * as React from 'react';

import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { backofficeTheme } from '../../../../../src/themes/backoffice';
import { controlButton } from '../../../../../src/themes/backoffice';
import CropRotate from 'wix-ui-icons-common/CropRotate';

const examplePrimary = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import { controlButton } from "wix-ui-core/themes/backoffice";
import CropRotate from "wix-ui-icons-common/CropRotate";

export default () => (
  <React.Fragment>
   <ButtonNext className={controlButton()}>
      <More width="24" height="24" />
   </ButtonNext>
   <ButtonNext className={controlButton('dark')}>
      <More width="24" height="24" />
   </ButtonNext>
  </React.Fragment>
);`;

const descriptionPrimary = (
  <div>
    Primary skins <code>standard</code> and <code>dark</code>.
  </div>
);

interface ControlButtonPrimaryProps {
  style?: object;
}

export const ControlButtonPrimary = ({ style }: ControlButtonPrimaryProps) => (
  <CodeShowcase
    title="Control Buttons"
    style={style}
    code={examplePrimary}
    description={descriptionPrimary}
  >
    <div
      style={{
        background: 'rgb(91, 127, 164)',
        padding: '2px'
      }}
    >
      <ButtonNext className={controlButton()}>
        <CropRotate width="24" height="24" />
      </ButtonNext>
    </div>
    <div
      style={{
        background: 'rgb(91, 127, 164)',
        padding: '2px'
      }}
    >
      <ButtonNext className={controlButton('dark')}>
        <CropRotate width="24" height="24" />
      </ButtonNext>
    </div>
  </CodeShowcase>
);
