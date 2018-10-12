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
    There are <code>primary</code> button, <code>default</code> button,
    <code>dashed</code> button and <code>danger</code> button in antd.
  </div>
);

const { premium, dark, light, transparent, destructive } = buttonNext;

const SkinsPrimary = ({ style }) => (
  <CodeShowcase
    title="Default"
    style={style}
    code={example}
    description={SkinsPrimaryDscrpt}
    theme={backofficeTheme}
  >
    <ButtonNext>standard</ButtonNext>
    <ButtonNext className={destructive}>destructive</ButtonNext>
    <ButtonNext className={premium}>premium</ButtonNext>
    <ButtonNext className={dark}>dark</ButtonNext>
    <ButtonNext className={light}>light</ButtonNext>
    <ButtonNext className={transparent}>transparent</ButtonNext>
  </CodeShowcase>
);

export default SkinsPrimary;
