import * as React from 'react';

import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { closeButton } from '../../../../../src/themes/backoffice';
import Close from 'wix-ui-icons-common/system/Close';

const exampleStandard = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import { closeButton } from "wix-ui-core/themes/backoffice";
import Close from "wix-ui-icons-common/system/Close";

export default () => (
  <React.Fragment>
   <ButtonNext className={closeButton()}>
      <Close width="6px" height="6px"/>
   </ButtonNext>
   <ButtonNext className={closeButton('standardFilled)}>
      <Close width="6px" height="6px"/>
   </ButtonNext>
   <ButtonNext className={closeButton('light')}>
      <Close width="6px" height="6px"/>
   </ButtonNext>
   <ButtonNext className={closeButton('lightFilled')}>
      <Close width="6px" height="6px"/>
   </ButtonNext>
   <ButtonNext className={closeButton('dark')}>
      <Close width="6px" height="6px"/>
   </ButtonNext>
   <ButtonNext className={closeButton('transparent')}>
      <Close width="6px" height="6px" />
   </ButtonNext>
  </React.Fragment>
);`;

const descriptionPrimary = (
  <div>
    Standard skins <code>standard</code>, <code>standardFilled</code>,{' '}
    <code>light</code>, <code>lightFilled</code>, <code>dark</code> and{' '}
    <code>transparent</code>.
  </div>
);

interface CloseButtonStandardProps {
  style?: object;
}

export const CloseButtonStandard = ({ style }: CloseButtonStandardProps) => (
  <CodeShowcase
    title="Close Buttons (standard)"
    style={style}
    code={exampleStandard}
    description={descriptionPrimary}
  >
    <ButtonNext className={closeButton()}>
      <Close width="6px" height="6px" />
    </ButtonNext>
    <ButtonNext className={closeButton('standardFilled')}>
      <Close width="6px" height="6px" />
    </ButtonNext>
    <div
      style={{
        background: '#162d3d',
        padding: '2px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ButtonNext className={closeButton('light')}>
        <Close width="6px" height="6px" />
      </ButtonNext>
    </div>

    <div
      style={{
        background: '#4eb7f5',
        padding: '2px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ButtonNext className={closeButton('lightFilled')}>
        <Close width="6px" height="6px" />
      </ButtonNext>
    </div>
    <div
      style={{
        background: '#fef0ba',
        padding: '2px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ButtonNext className={closeButton('dark')}>
        <Close width="6px" height="6px" />
      </ButtonNext>
    </div>
    <ButtonNext className={closeButton('transparent')}>
      <Close width="6px" height="6px" />
    </ButtonNext>
  </CodeShowcase>
);
