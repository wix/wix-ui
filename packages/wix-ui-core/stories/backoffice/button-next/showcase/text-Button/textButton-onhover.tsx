import * as React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import { ButtonNext } from '../../../../../src/components/button-next';
import { textButton } from '../../../../../src/themes/backoffice';

export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { textButton } from "wix-ui-core/themes/backoffice";

const secondary = textButton('onHover');
const lightSecondary = textButton('light', 'onHover');
const premiumSecondary = textButton('premium', 'onHover');
const darkSecondary = textButton('dark', 'onHover');

export default () => (
  <React.Fragment>
    <ButtonNext className={secondary}>standard</ButtonNext>
    <ButtonNext className={lightSecondary}>light</ButtonNext>
    <ButtonNext className={premiumSecondary}>premium</ButtonNext>
    <ButtonNext className={darkSecondary}>dark</ButtonNext>
  </React.Fragment>
);`;

const secondary = textButton(`onHover`);
const lightSecondary = textButton(`light`, 'onHover');
const premiumSecondary = textButton(`premium`, 'onHover');
const darkSecondary = textButton(`dark`, 'onHover');

const description = (
  <div>
    OnHover skins <code>standard</code>,<code>light</code>,<code>premium</code>{' '}
    and <code>dark</code>.
  </div>
);

interface TextButtonOnHoverProps {
  style?: object;
}

export const TextButtonOnHover = ({ style }: TextButtonOnHoverProps) => (
  <CodeShowcase
    title="Text buttons (underlined: onHover)"
    style={style}
    code={example}
    description={description}
  >
    <ButtonNext className={secondary}>standard</ButtonNext>
    <div
      style={{
        background: 'rgb(91, 127, 164)',
        padding: '2px',
      }}
    >
      <ButtonNext className={lightSecondary}>light</ButtonNext>
    </div>
    <ButtonNext className={premiumSecondary}>premium</ButtonNext>
    <ButtonNext className={darkSecondary}>dark</ButtonNext>
  </CodeShowcase>
);
