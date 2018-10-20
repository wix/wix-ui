import * as React from "react";

import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../src/components/button-next";
import { backofficeTheme } from "../../../../src/themes/backoffice";
import { iconButton } from "../../../../src/themes/backoffice";
import More from "wix-ui-icons-common/More";

const exampleStandard = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import { iconButton } from "wix-ui-core/themes/backoffice";
import More from "wix-ui-icons-common/More";

export default () => (
  <React.Fragment>
   <ButtonNext className={iconButton()}>
      <More width="24" height="24" />
   </ButtonNext>
   <ButtonNext className={iconButton('light')}>
      <More width="24" height="24" />
   </ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    Primary skins <code>standard</code> and <code>light</code>.
  </div>
);

interface SkinStandardProps {
  style?: object;
}

export const SkinStandard = ({ style }: SkinStandardProps) => (
  <CodeShowcase
    title="Icon Buttons (primary)"
    style={style}
    code={exampleStandard}
    theme={backofficeTheme}
    description={description}
    inverted
  >
    <ButtonNext className={iconButton()}>
      <More width="24" height="24" />
    </ButtonNext>
    <ButtonNext className={iconButton("light")}>
      <More width="24" height="24" />
    </ButtonNext>
  </CodeShowcase>
);

const exampleLight = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { iconButton } from "wix-ui-core/themes/backoffice";
import More from "wix-ui-icons-common/More";

export default () => (
  <React.Fragment>
    <ButtonNext className={iconButton("secondary")}>
      <More width="24" height="24" />
    </ButtonNext>
    <ButtonNext className={iconButton("light", "secondary")}>
      <More width="24" height="24"/>
    </ButtonNext>
  </React.Fragment>
);`;

const descriptionLight = (
  <div>
    Secondary skins <code>standard</code> and <code>light</code>
  </div>
);

interface SkinLightProps {
  style?: object;
}

export const SkinLight = ({ style }: SkinLightProps) => (
  <CodeShowcase
    title="Icon Buttons (secondary)"
    style={style}
    code={exampleLight}
    theme={backofficeTheme}
    description={descriptionLight}
    inverted
  >
    <ButtonNext className={iconButton("secondary")}>
      <More width="24" height="24" />
    </ButtonNext>
    <ButtonNext className={iconButton("light", "secondary")}>
      <More width="24" height="24" />
    </ButtonNext>
  </CodeShowcase>
);
