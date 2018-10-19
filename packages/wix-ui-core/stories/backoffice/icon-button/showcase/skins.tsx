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

interface SkinStandardProps {
  style?: object;
}

export const SkinStandard = ({ style }: SkinStandardProps) => (
  <CodeShowcase
    title="Skin standard"
    style={style}
    code={example}
    theme={backofficeTheme}
    description={description}
    inverted
  >
    <ButtonNext className={iconButton()}>
      <More />
    </ButtonNext>
    <ButtonNext className={iconButton("inverted")}>
      <More />
    </ButtonNext>
  </CodeShowcase>
);

interface SkinLightProps {
  style?: object;
}

export const SkinLight = ({ style }: SkinLightProps) => (
  <CodeShowcase
    title="Skin light"
    style={style}
    code={example}
    theme={backofficeTheme}
    description={description}
    inverted
  >
    <ButtonNext className={iconButton("light")}>
      <More />
    </ButtonNext>
    <ButtonNext className={iconButton("light", "secondary")}>
      <More />
    </ButtonNext>
  </CodeShowcase>
);
