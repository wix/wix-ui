import * as React from "react";

import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../src/components/button-next";
import { backofficeTheme } from "../../../../src/themes/backoffice";
import { iconButton } from "../../../../src/themes/backoffice";
import More from "wix-ui-icons-common/More";

const exampleStandard = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import { iconButton } from "wix-ui-core/themes/backoffice";

export default () => (
  <React.Fragment>
    <ButtonNext className={iconButton()}>
      <More />
    </ButtonNext>
    <ButtonNext className={iconButton("secondary")}>
      <More />
    </ButtonNext>
    <ButtonNext className={iconButton("inverted")}>
      <More />
    </ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    Skin <code>standard</code> is set by default. This is both priority{" "}
    <code>primary</code> and <code>secondary</code>
    button. On white based background additional class <code>inverted</code> can
    be used.
  </div>
);

interface SkinStandardProps {
  style?: object;
}

export const SkinStandard = ({ style }: SkinStandardProps) => (
  <CodeShowcase
    title="Skin Standard"
    style={style}
    code={exampleStandard}
    theme={backofficeTheme}
    description={description}
    inverted
  >
    <ButtonNext className={iconButton()}>
      <More />
    </ButtonNext>
    <ButtonNext className={iconButton("secondary")}>
      <More />
    </ButtonNext>
    <ButtonNext className={iconButton("inverted")}>
      <More />
    </ButtonNext>
  </CodeShowcase>
);

const exampleLight = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import { iconButton } from "wix-ui-core/themes/backoffice";

export default () => (
  <React.Fragment>
    <ButtonNext className={iconButton("light")}>
      <More />
    </ButtonNext>
    <ButtonNext className={iconButton("light", "secondary")}>
      <More />
    </ButtonNext>
  </React.Fragment>
);`;

const descriptionLight = (
  <div>
    Skin <code>light</code> is used on colorful backgrounds. Both{" "}
    <code>primary</code> and <code>secondary</code> priorities available.
  </div>
);

interface SkinLightProps {
  style?: object;
}

export const SkinLight = ({ style }: SkinLightProps) => (
  <CodeShowcase
    title="Skin Light"
    style={style}
    code={exampleLight}
    theme={backofficeTheme}
    description={descriptionLight}
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
