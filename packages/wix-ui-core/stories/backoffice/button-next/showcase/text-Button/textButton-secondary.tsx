import * as React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import { ButtonNext } from '../../../../../src/components/button-next';
import {
  textButton,
  backofficeTheme
} from '../../../../../src/themes/backoffice';

export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { textButton } from "wix-ui-core/themes/backoffice";

const secondary = textButton('secondary');
const lightSecondary = textButton('light', 'secondary');
const premiumSecondary = textButton('premium', 'secondary');
const darkSecondary = textButton('dark', 'secondary');

export default () => (
  <React.Fragment>
    <ButtonNext className={secondary}>standard</ButtonNext>
    <ButtonNext className={lightSecondary}>light</ButtonNext>
    <ButtonNext className={premiumSecondary}>premium</ButtonNext>
    <ButtonNext className={darkSecondary}>dark</ButtonNext>
  </React.Fragment>
);`;

const secondary = textButton(`secondary`);
const lightSecondary = textButton(`light`, 'secondary');
const premiumSecondary = textButton(`premium`, 'secondary');
const darkSecondary = textButton(`dark`, 'secondary');

const description = (
  <div>
    Secondary skins <code>standard</code>,<code>light</code>,
    <code>premium</code> and <code>dark</code>.
  </div>
);

interface TextButtonSecondaryProps {
  style?: object;
}

export const TextButtonSecondary = ({ style }: TextButtonSecondaryProps) => (
  <CodeShowcase
    title="Text buttons (secondary)"
    style={style}
    code={example}
    description={description}
    theme={backofficeTheme}
  >
    <ButtonNext className={secondary}>standard</ButtonNext>
    <div
      style={{
        background: 'rgb(91, 127, 164)',
        padding: '2px'
      }}
    >
      <ButtonNext className={lightSecondary}>light</ButtonNext>
    </div>
    <ButtonNext className={premiumSecondary}>premium</ButtonNext>
    <ButtonNext className={darkSecondary}>dark</ButtonNext>
  </CodeShowcase>
);
