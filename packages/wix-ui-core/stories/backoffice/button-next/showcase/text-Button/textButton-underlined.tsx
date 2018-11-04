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

const underlined = textButton('underlined');
const lightUnderlined = textButton('light', 'underlined');
const premiumUnderlined = textButton('premium', 'underlined');
const darkUnderlined = textButton('dark', 'underlined');

export default () => (
  <React.Fragment>
    <ButtonNext className={underlined}>standard</ButtonNext>
    <ButtonNext className={lightUnderlined}>light</ButtonNext>
    <ButtonNext className={premiumUnderlined}>premium</ButtonNext>
    <ButtonNext className={darkUnderlined}>dark</ButtonNext>
  </React.Fragment>
);`;

const underlined = textButton(`underlined`);
const lightUnderlined = textButton(`light`, 'underlined');
const premiumUnderlined = textButton(`premium`, 'underlined');
const darkUnderlined = textButton(`dark`, 'underlined');

const description = (
  <div>
    Underlined skins <code>standard</code>,<code>light</code>,
    <code>premium</code> and <code>dark</code>.
  </div>
);

interface TextButtonUnderlinedProps {
  style?: object;
}

export const TextButtonUnderlined = ({ style }: TextButtonUnderlinedProps) => (
  <CodeShowcase
    title="Text buttons (underlined)"
    style={style}
    code={example}
    description={description}
    theme={backofficeTheme}
  >
    <ButtonNext className={underlined}>standard</ButtonNext>
    <div
      style={{
        background: 'rgb(91, 127, 164)',
        padding: '2px'
      }}
    >
      <ButtonNext className={lightUnderlined}>light</ButtonNext>
    </div>
    <ButtonNext className={premiumUnderlined}>premium</ButtonNext>
    <ButtonNext className={darkUnderlined}>dark</ButtonNext>
  </CodeShowcase>
);
