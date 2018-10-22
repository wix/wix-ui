import * as React from "react";
import CodeShowcase from "wix-storybook-utils/CodeShowcase";

import { ButtonNext } from "../../../../../src/components/button-next";
import {
  buttonNext,
  backofficeTheme
} from "../../../../../src/themes/backoffice";
import { example } from "./skin-primary-example";

const SkinsPrimaryDscrpt = (
  <div>
    Primary skins <code>default</code>,<code>destructive</code>,
    <code>premium</code>,<code>dark</code>, <code>light</code>,{" "}
    <code>transparent</code>. <code>Inverted</code> value is supported only on
    default button.
  </div>
);

interface SkinsPrimaryProps {
  style?: object;
}

const SkinsPrimary = ({ style }: SkinsPrimaryProps) => (
  <CodeShowcase
    title="Primary"
    style={style}
    code={example}
    description={SkinsPrimaryDscrpt}
    theme={backofficeTheme}
    inverted
  >
    <ButtonNext>standard</ButtonNext>
    <ButtonNext className={buttonNext(`inverted`)}>inverted</ButtonNext>
    <ButtonNext className={buttonNext(`destructive`)}>destructive</ButtonNext>
    <ButtonNext className={buttonNext(`premium`)}>premium</ButtonNext>
    <ButtonNext className={buttonNext(`dark`)}>dark</ButtonNext>
    <ButtonNext className={buttonNext(`light`)}>light</ButtonNext>
    <ButtonNext className={buttonNext(`transparent`)}>transparent</ButtonNext>
  </CodeShowcase>
);

export default SkinsPrimary;
