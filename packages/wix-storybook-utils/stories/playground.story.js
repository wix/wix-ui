import * as React from "react";
import { header, importExample, description } from "../src/Sections";

import Playground from "../src/Playground";
import Box from "../src/Test/Box/Box";

const code = `
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
    description(<Playground initialCode={code} scope={{ Box }} />)
  ]
};
