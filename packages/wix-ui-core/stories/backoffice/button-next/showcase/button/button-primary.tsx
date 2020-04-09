import * as React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import { ButtonNext } from '../../../../../src/components/button-next';
import { button, backofficeTheme } from '../../../../../src/themes/backoffice';

export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { button } from "wix-ui-core/themes/backoffice";

export default () => (
  <React.Fragment>
    <ButtonNext className={button()}>default</ButtonNext>
    <ButtonNext className={button("destructive")}>destructive</ButtonNext>
    <ButtonNext className={button("premium")}>premium</ButtonNext>
    <ButtonNext className={button("dark")}>dark</ButtonNext>
    <ButtonNext className={button("premium", light")}>premium-light</ButtonNext>
    <ButtonNext className={button("light")}>light</ButtonNext>
    <ButtonNext className={button("transparent")}>transparent</ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    Primary skins <code>standard</code>,<code>destructive</code>,
    <code>premium</code>,<code>dark</code>, <code>light</code> and
    <code>transparent</code>.
  </div>
);

interface ButtonPrimaryProps {
  style?: object;
}

export const ButtonPrimary = ({ style }: ButtonPrimaryProps) => (
  <CodeShowcase
    title="Filled buttons (primary)"
    style={style}
    code={example}
    description={description}
    theme={backofficeTheme}
  >
    <ButtonNext className={button()}>standard</ButtonNext>
    <ButtonNext className={button(`destructive`)}>destructive</ButtonNext>
    <ButtonNext className={button(`premium`)}>premium</ButtonNext>
    <div
      style={{
        background: '#fef0ba',
        padding: '2px',
      }}
    >
      <ButtonNext className={button(`dark`)}>dark</ButtonNext>
    </div>
    <div
      style={{
        background: '#162d3d',
        padding: '2px',
      }}
    >
      <span style={{ marginRight: '5px' }}>
        <ButtonNext className={button('premium-light')}>
          premium-light
        </ButtonNext>
      </span>
      <ButtonNext className={button(`light`)}>light</ButtonNext>
    </div>
    <div
      style={{
        background: '#4EB7F5',
        padding: '2px',
      }}
    >
      <ButtonNext className={button(`transparent`)}>transparent</ButtonNext>
    </div>
  </CodeShowcase>
);
