import * as React from "react";
import CodeShowcase from "wix-storybook-utils/CodeShowcase";

import { ButtonNext } from "../../../../../src/components/button-next";
import {
  textButton,
  backofficeTheme
} from "../../../../../src/themes/backoffice";

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

interface TextButtonPrimaryProps {
  style?: object;
}

export const TextButtonPrimary = ({ style }: TextButtonPrimaryProps) => (
  <CodeShowcase
    title="Text buttons (primary)"
    style={style}
    code={example}
    description={description}
    theme={backofficeTheme}
    inverted
  >
    <ButtonNext className={textButton()}>standard</ButtonNext>
    <ButtonNext className={textButton(`light`)}>light</ButtonNext>
    <ButtonNext className={textButton(`premium`)}>premium</ButtonNext>
    <ButtonNext className={textButton(`dark`)}>dark</ButtonNext>
  </CodeShowcase>
);
