import * as React from "react";
import classNames from "classnames";

import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../../src/components/button-next";
import {
  buttonNext,
  backofficeTheme
} from "../../../../../src/themes/backoffice";
import { example } from "./skin-secondary-example";

const description = (
  <div>
    There are <code>primary</code> button, <code>default</code> button,
    <code>dashed</code> button and <code>danger</code> button in antd.
  </div>
);

const { premium, dark, light, transparent, destructive } = buttonNext;
const { secondary } = buttonNext;

const premiumSecondary = classNames(premium, secondary);
const darkSecondary = classNames(dark, secondary);
const lightSecondary = classNames(light, secondary);
const transparentSecondary = classNames(transparent, secondary);
const destructiveSecondary = classNames(destructive, secondary);

const SkinsSecondary = ({ style }) => (
  <CodeShowcase
    title="Secondary"
    style={style}
    code={example}
    description={description}
    theme={backofficeTheme}
  >
    <ButtonNext className={secondary}>standard</ButtonNext>
    <ButtonNext className={destructiveSecondary}>destructive</ButtonNext>
    <ButtonNext className={premiumSecondary}>premium</ButtonNext>
    <ButtonNext className={darkSecondary}>dark</ButtonNext>
    <ButtonNext className={lightSecondary}>light</ButtonNext>
    <ButtonNext className={transparentSecondary}>transparent</ButtonNext>
  </CodeShowcase>
);

export default SkinsSecondary;
