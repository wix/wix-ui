import * as React from "react";
import { IconButton } from "./icon-button";
import More from "wix-ui-icons-common/More";
import { Examples } from "./showcase";

export default {
  category: "BackOffice",
  storyName: "IconButton",
  component: IconButton,
  componentPath: "../../../src/components/button-next/button-next.tsx",

  componentProps: {
    disabled: false,
    children: <More />,
    "data-hook": "storybook-iconButton"
  },

  exampleProps: {
    onClick: () => "Clicked!"
  },

  examples: Examples
};
