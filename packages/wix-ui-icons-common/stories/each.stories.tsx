import React from "react";
import { storiesOf } from "@storybook/react";
import * as generalIcons from "../src/general/dist";
import * as systemIcons from "../src/system/dist";
import { IconProps } from "./types";

const addStory = (iconName: string, Icon: React.FC<IconProps>) =>
  storiesOf(`Icons/Each`, module).add(iconName, () => <Icon />);

Object.entries(generalIcons).forEach(([iconName, Icon]) =>
  addStory(iconName, Icon)
);
Object.entries(systemIcons).forEach(([iconName, Icon]) =>
  addStory(iconName, Icon)
);
