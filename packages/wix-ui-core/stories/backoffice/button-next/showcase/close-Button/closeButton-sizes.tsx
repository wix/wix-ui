import * as React from 'react';

import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { closeButton } from '../../../../../src/themes/backoffice';
import CloseLarge from 'wix-ui-icons-common/system/CloseLarge';
import Close from 'wix-ui-icons-common/system/Close';

const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { closeButton } from "wix-ui-core/themes/backoffice";
import Close from "wix-ui-icons-common/system/Close";
import CloseLarge from "wix-ui-icons-common/system/CloseLarge";

export default () => (
  <React.Fragment>
    <ButtonNext className={closeButton()}>
      <Close width="6px" height="6px" />
    </ButtonNext>
    <ButtonNext className={closeButton()}>
      <CloseLarge width="8px" height="8px" />
    </ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    Close button size is controlled only by icon width. Default value is small
    with <code>width="6px</code> and <code>height="6px</code> attributes. Medium
    size should have icon attributes <code>width="8px"</code> and{' '}
    <code>height="8px"</code>.
  </div>
);

interface CloseButtonSizesProps {
  style?: object;
}

export const CloseButtonSizes = ({ style }: CloseButtonSizesProps) => (
  <CodeShowcase
    title="Icon Buttons (sizes)"
    style={style}
    code={example}
    description={description}
  >
    <ButtonNext className={closeButton()}>
      <Close width="6px" height="6px" />
    </ButtonNext>
    <ButtonNext className={closeButton('medium')}>
      <CloseLarge width="8px" height="8px" />
    </ButtonNext>
  </CodeShowcase>
);
