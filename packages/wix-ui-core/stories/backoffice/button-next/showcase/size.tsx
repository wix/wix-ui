import * as React from "react";
import CodeShowcase from "wix-storybook-utils/CodeShowcase";
import { ButtonNext } from "../../../../src/components/button-next";
import { buttonNext, backofficeTheme } from "../../../../src/themes/backoffice";

const example = `import * as React from "react";
import { ButtonNext } from "wix-ui-core/button-next";
import { buttonNext } from "wix-ui-core/themes/backoffice";

export default () => (
  <React.Fragment>
    <ButtonNext className={buttonNext('tiny')}>tiny</ButtonNext>
    <ButtonNext className={buttonNext('small')}>small</ButtonNext>
    <ButtonNext className={buttonNext('medium')}>medium</ButtonNext>
    <ButtonNext className={buttonNext('large')}>large</ButtonNext>
  </React.Fragment>
);`;

const description = (
  <div>
    Button supports four main sizes: <code>tiny</code>, <code>small</code>,
    <code>medium</code>, <code>large</code>. Default size is <code>medium</code>
    .
  </div>
);

const dependencies = [
  { component: "ButtonNext", path: "button-next", module: "named" }
];

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
    dependencies={dependencies}
  >
    <ButtonNext className={buttonNext("tiny")}>tiny</ButtonNext>
    <ButtonNext className={buttonNext("small")}>small</ButtonNext>
    <ButtonNext className={buttonNext("medium")}>medium</ButtonNext>
    <ButtonNext className={buttonNext("large")}>large</ButtonNext>
  </CodeShowcase>
);

export default Size;
