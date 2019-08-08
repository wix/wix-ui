import * as React from 'react';

import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { backofficeTheme } from '../../../../../src/themes/backoffice';
import { controlButton } from '../../../../../src/themes/backoffice';
import CropRotate from 'wix-ui-icons-common/CropRotate';

const exampleActive = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import { controlButton } from "wix-ui-core/themes/backoffice";
import CropRotate from "wix-ui-icons-common/CropRotate";

export default () => (
  <React.Fragment>
   <ButtonNext className={controlButton('active')}>
      <More width="24" height="24" />
   </ButtonNext>
   <ButtonNext className={controlButton('dark', 'active')}>
      <More width="24" height="24" />
   </ButtonNext>
  </React.Fragment>
);`;

const descriptionActive = (
  <div>
    Active state.
  </div>
);

interface ControlButtonActiveProps {
  style?: object;
}

export const ControlButtonActive = ({ style }: ControlButtonActiveProps) => (
  <CodeShowcase
    title="Control Buttons"
    style={style}
    code={exampleActive}
    description={descriptionActive}
  >
    <div
      style={{
        background: 'rgb(91, 127, 164)',
        padding: '2px'
      }}
    >
      <ButtonNext className={controlButton('active')}>
        <CropRotate width="24" height="24" />
      </ButtonNext>
    </div>
    <div
      style={{
        background: 'rgb(91, 127, 164)',
        padding: '2px'
      }}
    >
      <ButtonNext className={controlButton('dark', 'active')}>
        <CropRotate width="24" height="24" />
      </ButtonNext>
    </div>
  </CodeShowcase>
);
