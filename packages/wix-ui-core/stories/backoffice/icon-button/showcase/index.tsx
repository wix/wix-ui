import * as React from "react";

import { SkinStandard, SkinLight } from "./skins";
import { Sizes } from "./sizes";

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
      <SkinStandard />
      <Sizes />
    </div>
    <div style={halfColumn}>
      <SkinLight />
    </div>
  </div>
);
