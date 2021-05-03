import * as React from "react";
import { header, importExample, description, code } from "../src/Sections";

import Playground from "../src/Playground";

const codeExample = `
class Component extends React.Component {
  componentDidMount() {
    console.log("hello");
  }

  render() {
    return <div>hey</div>;
  }
}
`;

export default {
  category: "Components",
  storyName: "Playground",
  sections: [
    header({ title: "Playground component" }),
    importExample("import Playground from 'wix-storybook-utils/Playground'"),
    description(<Playground initialCode={codeExample} />),
    code({ source: '<Button>Hello</Button>' })
  ]
};
