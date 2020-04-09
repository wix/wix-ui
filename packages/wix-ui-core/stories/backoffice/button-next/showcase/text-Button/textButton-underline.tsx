import * as React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import { ButtonNext } from '../../../../../src/components/button-next';
import { textButton } from '../../../../../src/themes/backoffice';

export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { textButton } from "wix-ui-core/themes/backoffice";

const underline = textButton('always');
const lightUnderline = textButton('light', 'always');
const premiumUnderline = textButton('premium', 'always);
const darkUnderline = textButton('dark', 'always');

export default () => (
  <React.Fragment>
    <ButtonNext className={underline}>standard</ButtonNext>
    <ButtonNext className={lightUnderline}>light</ButtonNext>
    <ButtonNext className={premiumUnderline}>premium</ButtonNext>
    <ButtonNext className={darkUnderline}>dark</ButtonNext>
  </React.Fragment>
);`;

const underline = textButton(`always`);
const lightUnderline = textButton(`light`, 'always');
const premiumUnderline = textButton(`premium`, 'always');
const darkUnderline = textButton(`dark`, 'always');

const description = (
  <div>
    Underline skins <code>standard</code>,<code>light</code>,
    <code>premium</code> and <code>dark</code>.
  </div>
);

interface TextButtonUnderlineProps {
  style?: object;
}

export const TextButtonUnderline = ({ style }: TextButtonUnderlineProps) => (
  <CodeShowcase
    title="Text buttons (underline: always)"
    style={style}
    code={example}
    description={description}
  >
    <ButtonNext className={underline}>standard</ButtonNext>
    <div
      style={{
        background: 'rgb(91, 127, 164)',
        padding: '2px',
      }}
    >
      <ButtonNext className={lightUnderline}>light</ButtonNext>
    </div>
    <ButtonNext className={premiumUnderline}>premium</ButtonNext>
    <ButtonNext className={darkUnderline}>dark</ButtonNext>
  </CodeShowcase>
);
