import * as React from 'react';

import CodeShowcase from 'wix-storybook-utils/CodeShowcase';
import { ButtonNext } from '../../../../../src/components/button-next';
import { textButton } from '../../../../../src/themes/backoffice';

const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { textButton } from "wix-ui-core/themes/backoffice";

export default () => (
  <React.Fragment>
    <ButtonNext className={textButton()}>thin</ButtonNext>
    <ButtonNext className={textButton('normal')}>normal</ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    Text Button supports <code>thin</code> and <code>normal</code> weight. The
    default value is <code>thin</code>
  </div>
);

interface TextButtonWeightsProps {
  style?: object;
}

export const TextButtonWeights = ({ style }: TextButtonWeightsProps) => (
  <CodeShowcase
    title="Text Buttons (weights)"
    style={style}
    code={example}
    description={description}
  >
    <ButtonNext className={textButton()}>thin</ButtonNext>
    <ButtonNext className={textButton('normal')}>normal</ButtonNext>
  </CodeShowcase>
);
