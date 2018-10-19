import * as React from "react";
import { ButtonNext } from "../button-next/button-next";
import { iconButton } from "../../../src/themes/backoffice";
import More from "wix-ui-icons-common/More";
import { Examples } from "./showcase";

export default {
  category: "BackOffice",
  storyName: "IconButton",
  component: ButtonNext,
  componentPath: "../../../src/components/button-next/button-next.tsx",

  componentProps: {
    disabled: false,
    classNames: iconButton(""),
    children: <More />,
    "data-hook": "storybook-iconButton"
  },

  exampleProps: {
    onClick: () => "Clicked!"
  },

  examples: Examples
};
