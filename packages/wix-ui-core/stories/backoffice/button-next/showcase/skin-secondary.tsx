import * as React from "react";

import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../src/components/button-next";
import { buttonNext, backofficeTheme } from "../../../../src/themes/backoffice";

export const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { buttonNext } from "wix-ui-core/themes/backoffice";

const premiumSecondary = buttonNext('premium', 'secondary');
const darkSecondary = buttonNext('dark', 'secondary');
const lightSecondary = buttonNext('light', 'secondary');
const transparentSecondary = buttonNext('transparent, 'secondary');
const destructiveSecondary = buttonNext('destructive', 'secondary');

export default () => (
  <React.Fragment>
    <ButtonNext className={buttonNext('secondary')}>default</ButtonNext>
    <ButtonNext className={destructiveSecondary}>destructive</ButtonNext>
    <ButtonNext className={premiumSecondary}>premium</ButtonNext>
    <ButtonNext className={darkSecondary}>dark</ButtonNext>
    <ButtonNext className={lightSecondary}>light</ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    Secondary skins <code>default</code>,<code>destructive</code>,
    <code>premium</code>,<code>dark</code> and <code>light</code>.
  </div>
);

const premiumSecondary = buttonNext(`premium`, "secondary");
const darkSecondary = buttonNext(`dark`, "secondary");
const lightSecondary = buttonNext(`light`, "secondary");
const transparentSecondary = buttonNext(`transparent`, "secondary");
const destructiveSecondary = buttonNext(`destructive`, "secondary");

interface SkinsSecondaryProps {
  style?: object;
}

const SkinsSecondary = ({ style }: SkinsSecondaryProps) => (
  <CodeShowcase
    title="Ghost buttons (secondary)"
    style={style}
    code={example}
    description={description}
    theme={backofficeTheme}
    inverted
  >
    <ButtonNext className={buttonNext(`secondary`)}>standard</ButtonNext>
    <ButtonNext className={destructiveSecondary}>destructive</ButtonNext>
    <ButtonNext className={premiumSecondary}>premium</ButtonNext>
    <ButtonNext className={darkSecondary}>dark</ButtonNext>
    <ButtonNext className={lightSecondary}>light</ButtonNext>
  </CodeShowcase>
);

export default SkinsSecondary;
