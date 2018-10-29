import * as React from "react";

import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../../src/components/button-next";
import { backofficeTheme } from "../../../../../src/themes/backoffice";
import { closeButton } from "../../../../../src/themes/backoffice";
import X from "wix-ui-icons-common/X";

const exampleStandard = `import * as React from "react";
import { ButtonNext } from "wix-ui-core";
import { closeButton } from "wix-ui-core/themes/backoffice";
import X from "wix-ui-icons-common/X";

export default () => (
  <React.Fragment>
   <ButtonNext className={closeButton()}>
      <X />
   </ButtonNext>
   <ButtonNext className={closeButton('light')}>
      <X />
   </ButtonNext>
   <ButtonNext className={closeButton('dark')}>
      <X />
   </ButtonNext>
   <ButtonNext className={closeButton('transparent')}>
      <X />
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
    title="Close Buttons (skins)"
    style={style}
    code={exampleStandard}
    theme={backofficeTheme}
    description={descriptionPrimary}
  >
    <ButtonNext className={closeButton()}>
      <X />
    </ButtonNext>
    <div
      style={{
        background: "rgb(91, 127, 164)",
        padding: "2px"
      }}
    >
      <ButtonNext className={closeButton("light")}>
        <X />
      </ButtonNext>
    </div>
    <div
      style={{
        background: "rgb(91, 127, 164)",
        padding: "2px"
      }}
    >
      <ButtonNext className={closeButton("dark")}>
        <X />
      </ButtonNext>
    </div>
    <div
      style={{
        background: "rgb(91, 127, 164)",
        padding: "2px"
      }}
    >
      <ButtonNext className={closeButton("transparent")}>
        <X />
      </ButtonNext>
    </div>
  </CodeShowcase>
);
