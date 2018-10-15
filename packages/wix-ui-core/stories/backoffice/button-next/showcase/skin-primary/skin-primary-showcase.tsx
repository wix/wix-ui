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
    <code>transparent</code>.
  </div>
);

const { premium, dark, light, transparent, destructive } = buttonNext;

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
  >
    <ButtonNext>default</ButtonNext>
    <ButtonNext className={destructive}>destructive</ButtonNext>
    <ButtonNext className={premium}>premium</ButtonNext>
    <ButtonNext className={dark}>dark</ButtonNext>
    <ButtonNext className={light}>light</ButtonNext>
    <ButtonNext className={transparent}>transparent</ButtonNext>
  </CodeShowcase>
);

export default SkinsPrimary;
