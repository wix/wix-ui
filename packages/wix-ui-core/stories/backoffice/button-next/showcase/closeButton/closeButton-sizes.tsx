import * as React from "react";

import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../../src/components/button-next";
import { backofficeTheme } from "../../../../../src/themes/backoffice";
import { closeButton } from "../../../../../src/themes/backoffice";
import CloseLarge from "wix-ui-icons-common/system/CloseLarge";
import Close from "wix-ui-icons-common/system/Close";

const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { closeButton } from "wix-ui-core/themes/backoffice";
import Close from "wix-ui-icons-common/system/Close";
import CloseLarge from "wix-ui-icons-common/system/CloseLarge";

export default () => (
  <React.Fragment>
    <ButtonNext className={closeButton()}>
      <Close width="6px" height="6px" />
    </ButtonNext>
    <ButtonNext className={closeButton("medium")}>
      <CloseLarge width="8px" height="8px" />
    </ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    Close button supports <code>small</code> and <code>medium</code> sizes. The
    default value is <code>small</code>.
  </div>
);

interface CloseButtonSizesProps {
  style?: object;
}

export const CloseButtonSizes = ({ style }: CloseButtonSizesProps) => (
  <CodeShowcase
    title="Icon Buttons (sizes)"
    style={style}
    code={example}
    theme={backofficeTheme}
    description={description}
  >
    <ButtonNext className={closeButton()}>
      <Close width="6px" height="6px" />
    </ButtonNext>
    <ButtonNext className={closeButton("medium")}>
      <CloseLarge width="8px" height="8px" />
    </ButtonNext>
  </CodeShowcase>
);
