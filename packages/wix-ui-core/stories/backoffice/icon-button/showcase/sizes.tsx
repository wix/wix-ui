import * as React from "react";

import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../src/components/button-next";
import { backofficeTheme } from "../../../../src/themes/backoffice";
import { iconButton } from "../../../../src/themes/backoffice";
import More from "wix-ui-icons-common/More";
import { example } from "./skins-example";

const description = (
  <div>
    Suffix and prefix icons can be added to a button by setting
    <code>prefixIcon</code> or <code>suffixIcon</code> props.
  </div>
);

interface SizesProps {
  style?: object;
}

export const Sizes = ({ style }: SizesProps) => (
  <CodeShowcase
    title="Skin standard"
    style={style}
    code={example}
    theme={backofficeTheme}
    description={description}
  >
    <ButtonNext className={iconButton("small")}>
      <More />
    </ButtonNext>
    <ButtonNext className={iconButton()}>
      <More />
    </ButtonNext>
  </CodeShowcase>
);
