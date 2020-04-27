import * as React from 'react';

import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { button, backofficeTheme } from '../../../../../src/themes/backoffice';

export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { button } from "wix-ui-core/themes/backoffice";

const secondary = buttonNext('secondary');
const premiumSecondary = button('premium', 'secondary');
const darkSecondary = button('dark', 'secondary');
const lightSecondary = button('light', 'secondary');
const destructiveSecondary = button('destructive', 'secondary');
const transparentSecondary = button('transparent', 'secondary')

export default () => (
  <React.Fragment>
    <ButtonNext className={secondary}>default</ButtonNext>
    <ButtonNext className={destructiveSecondary}>destructive</ButtonNext>
    <ButtonNext className={premiumSecondary}>premium</ButtonNext>
    <ButtonNext className={darkSecondary}>dark</ButtonNext>
    <ButtonNext className={lightSecondary}>light</ButtonNext>
    <ButtonNext className={transparentSecondary}>transparent</ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    Secondary skins <code>standard</code>,<code>destructive</code>,
    <code>premium</code>,<code>dark</code>, <code>light</code> and{' '}
    <code>transparent</code>.
  </div>
);

const secondary = button(`secondary`);
const premiumSecondary = button(`premium`, 'secondary');
const darkSecondary = button(`dark`, 'secondary');
const lightSecondary = button(`light`, 'secondary');
const transparentSecondary = button(`transparent`, 'secondary');
const destructiveSecondary = button(`destructive`, 'secondary');

interface ButtonSecondaryProps {
  style?: object;
}

export const ButtonSecondary = ({ style }: ButtonSecondaryProps) => (
  <CodeShowcase
    title="Ghost buttons (secondary)"
    style={style}
    code={example}
    description={description}
    theme={backofficeTheme}
  >
    <ButtonNext className={secondary}>standard</ButtonNext>
    <ButtonNext className={destructiveSecondary}>destructive</ButtonNext>
    <ButtonNext className={premiumSecondary}>premium</ButtonNext>
    <div
      style={{
        background: '#fef0ba',
        padding: '2px',
      }}
    >
      <ButtonNext className={darkSecondary}>dark</ButtonNext>
    </div>
    <div
      style={{
        background: '#162d3d',
        padding: '2px',
      }}
    >
      <ButtonNext className={lightSecondary}>light</ButtonNext>
    </div>
    <div
      style={{
        background: '#4EB7F5',
        padding: '2px',
      }}
    >
      <ButtonNext className={transparentSecondary}>transparent</ButtonNext>
    </div>
  </CodeShowcase>
);
