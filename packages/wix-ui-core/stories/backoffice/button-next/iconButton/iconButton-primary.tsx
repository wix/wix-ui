import * as React from "react";

import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../../src/components/button-next";
import { backofficeTheme } from "../../../../../src/themes/backoffice";
import { iconButton } from "../../../../../src/themes/backoffice";
import More from "wix-ui-icons-common/More";

const examplePrimary = `import * as React from "react";
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

const descriptionPrimary = (
  <div>
    Primary skins <code>standard</code> and <code>light</code>.
  </div>
);

interface IconButtonPrimaryProps {
  style?: object;
}

export const IconButtonPrimary = ({ style }: IconButtonPrimaryProps) => (
  <CodeShowcase
    title="Icon Buttons (primary)"
    style={style}
    code={examplePrimary}
    theme={backofficeTheme}
    description={descriptionPrimary}
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
