import * as React from "react";
import CodeShowcase from "wix-storybook-utils/CodeShowcase";

import { ButtonNext } from "../../../../../src/components/button-next";
import {
  buttonNext,
  backofficeTheme
} from "../../../../../src/themes/backoffice";

export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { buttonNext } from "wix-ui-core/themes/backoffice";

export default () => (
  <React.Fragment>
    <ButtonNext className={buttonNext()}>default</ButtonNext>
    <ButtonNext className={buttonNext("destructive")}>destructive</ButtonNext>
    <ButtonNext className={buttonNext("premium")}>premium</ButtonNext>
    <ButtonNext className={buttonNext("dark")}>dark</ButtonNext>
    <ButtonNext className={buttonNext("light")}>light</ButtonNext>
    <ButtonNext className={buttonNext("transparent")}>transparent</ButtonNext>
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
    <ButtonNext className={buttonNext()}>standard</ButtonNext>
    <ButtonNext className={buttonNext(`destructive`)}>destructive</ButtonNext>
    <ButtonNext className={buttonNext(`premium`)}>premium</ButtonNext>
    <div
      style={{
        background: "#fef0ba",
        padding: "2px"
      }}
    >
      <ButtonNext className={buttonNext(`dark`)}>dark</ButtonNext>
    </div>
    <div
      style={{
        background: "#162d3d",
        padding: "2px"
      }}
    >
      <ButtonNext className={buttonNext(`light`)}>light</ButtonNext>
    </div>
    <div
      style={{
        background: "#3899ec",
        padding: "2px"
      }}
    >
      <ButtonNext className={buttonNext(`transparent`)}>transparent</ButtonNext>
    </div>
  </CodeShowcase>
);
