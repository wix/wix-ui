import * as React from "react";

import Affixes from "./affixes/affixes-showcase";
import Size from "./size/size-showcase";
import SkinsSecondary from "./skin-secondary/skin-secondary-showcase";
import SkinsPrimary from "./skin-primary/skin-primary-showcase";

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

export const Examples = (
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
