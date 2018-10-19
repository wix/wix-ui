import * as React from "react";

import Affixes from "./showcase/affixes/affixes-showcase";
import Size from "./showcase/size/size-showcase";
import SkinsSecondary from "./showcase/skin-secondary/skin-secondary-showcase";
import SkinsPrimary from "./showcase/skin-primary/skin-primary-showcase";

const controlledWidth = {
  maxWidth: "1254px",
  height: "auto",
  width: "100%",
  display: "flex"
};

const halfColumn = {
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  width: "48%"
};

const ButtonNextStory = () => (
  <div style={controlledWidth}>
    <div style={halfColumn}>
      <SkinsPrimary />
      <Size />
    </div>
    <div style={halfColumn}>
      <SkinsSecondary />
      <Affixes />
    </div>
  </div>
);

export default ButtonNextStory;
