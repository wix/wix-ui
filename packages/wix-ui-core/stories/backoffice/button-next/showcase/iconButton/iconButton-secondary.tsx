import * as React from "react";

import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../../src/components/button-next";
import { backofficeTheme } from "../../../../../src/themes/backoffice";
import { iconButton } from "../../../../../src/themes/backoffice";
import More from "wix-ui-icons-common/More";

const exampleSecondary = `import * as React from "react";
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

const secondaryDescription = (
  <div>
    Secondary skins <code>standard</code> and <code>light</code>
  </div>
);

interface IconButtonSecondaryProps {
  style?: object;
}

export const IconButtonSecondary = ({ style }: IconButtonSecondaryProps) => (
  <CodeShowcase
    title="Icon Buttons (secondary)"
    style={style}
    code={exampleSecondary}
    theme={backofficeTheme}
    description={secondaryDescription}
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
