import * as React from "react";
import { header, importExample, description } from "../src/Sections";

import Playground from "../src/Playground";

export default {
  category: "Components",
  storyName: "Playground",
  sections: [
    header({ title: "Playground component" }),
    importExample("import Playground from 'wix-storybook-utils/Playground'"),
    description(<Playground initialCode="<div/>" />)
  ]
};
