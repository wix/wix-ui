import * as React from 'react';

import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { backofficeTheme } from '../../../../../src/themes/backoffice';
import { closeButton } from '../../../../../src/themes/backoffice';
import Close from 'wix-ui-icons-common/system/Close';

const exampleStandard = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import { closeButton } from "wix-ui-core/themes/backoffice";
import Close from "wix-ui-icons-common/Close";

export default () => (
  <React.Fragment>
   <ButtonNext className={closeButton('inverted')}>
      <Close width="6px" height="6px" />
   </ButtonNext>
  </React.Fragment>
);`;

const descriptionPrimary = (
  <div>
    Inverted skins <code>standard</code>.
  </div>
);

interface CloseButtonInvertedProps {
  style?: object;
}

export const CloseButtonInverted = ({ style }: CloseButtonInvertedProps) => (
  <CodeShowcase
    title="Close Buttons (inverted)"
    style={style}
    code={exampleStandard}
    description={descriptionPrimary}
  >
    <ButtonNext className={closeButton('inverted')}>
      <Close width="6px" height="6px" />
    </ButtonNext>
  </CodeShowcase>
);
