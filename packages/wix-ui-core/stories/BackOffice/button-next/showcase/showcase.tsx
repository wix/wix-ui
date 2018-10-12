import * as React from "react";

import Affixes from "./affixes/affixes-showcase";
import Size from "./size/size-showcase";
import SkinsSecondary from "./skin-secondary/skin-secondary-showcase";
import SkinsPrimary from "./skin-primary/skin-primary-showcase";

const controlledWidth = {
  maxWidth: "1254px",
  height: "auto",
  width: "100%"
};

const halfColumn = {
  display: "inlince-block",
  verticalAlign: "top",
  width: "48%"
};

export const Skins = (
  <div style={controlledWidth}>
    <SkinsPrimary style={halfColumn} />
    <SkinsSecondary style={halfColumn} />
  </div>
);

export const Props = (
  <div style={controlledWidth}>
    <Size style={halfColumn} />
    <Affixes style={halfColumn} />
  </div>
);
