import * as React from "react";
import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../../src/components/button-next";
import {
  buttonNext,
  backofficeTheme
} from "../../../../../src/themes/backoffice";
import { example } from "./size-example";

const description = (
  <div>
    Button supports four main sizes: <code>tiny</code>, <code>small</code>,
    <code>medium</code>, <code>large</code>. Default size is <code>medium</code>
    .
  </div>
);
interface SizeProps {
  style?: object;
}

const Size = ({ style }: SizeProps) => (
  <CodeShowcase
    title="Size"
    style={style}
    code={example}
    theme={backofficeTheme}
    description={description}
  >
    <ButtonNext className={buttonNext("tiny")}>tiny</ButtonNext>
    <ButtonNext className={buttonNext("small")}>small</ButtonNext>
    <ButtonNext className={buttonNext("medium")}>medium</ButtonNext>
    <ButtonNext className={buttonNext("large")}>large</ButtonNext>
  </CodeShowcase>
);

export default Size;
