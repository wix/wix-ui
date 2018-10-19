import * as React from "react";

import Affixes from "./showcase/affixes";
import Size from "./showcase/size";
import SkinsSecondary from "./showcase/skin-secondary";
import SkinsPrimary from "./showcase/skin-primary";

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
