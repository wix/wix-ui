import * as React from 'react';
import CodeShowcase from 'wix-storybook-utils/CodeShowcase';

import { ButtonNext } from '../../../../../src/components/button-next';
import { textButton } from '../../../../../src/themes/backoffice';

export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { textButton } from "wix-ui-core/themes/backoffice";

export default () => (
  <React.Fragment>
    <ButtonNext className={textButton()}>standard</ButtonNext>
    <ButtonNext className={textButton('light')}>light</ButtonNext>
    <ButtonNext className={textButton('premium')}>premium</ButtonNext>
    <ButtonNext className={textButton('dark')}>dark</ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    Primary skins <code>standard</code>,<code>light</code>,<code>premium</code>
    and <code>dark</code>.
  </div>
);

interface TextButtonNoneProps {
  style?: object;
}

export const TextButtonNone = ({ style }: TextButtonNoneProps) => (
  <CodeShowcase
    title="Text buttons (underlined:none)"
    style={style}
    code={example}
    description={description}
  >
    <ButtonNext className={textButton()}>standard</ButtonNext>
    <div
      style={{
        background: 'rgb(91, 127, 164)',
        padding: '2px',
      }}
    >
      <ButtonNext className={textButton(`light`)}>light</ButtonNext>
    </div>
    <ButtonNext className={textButton(`premium`)}>premium</ButtonNext>
    <ButtonNext className={textButton(`dark`)}>dark</ButtonNext>
  </CodeShowcase>
);
