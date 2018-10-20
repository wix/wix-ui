import * as React from "react";

import Affixes from "./showcase/affixes";
import Size from "./showcase/size";
import SkinsSecondary from "./showcase/skin-secondary";
import SkinsPrimary from "./showcase/skin-primary";
import { SkinStandard, SkinLight } from "./showcase/icon-skins";
import { Sizes } from "./showcase/icon-sizes";

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

const ButtonsStory = () => (
  <div style={{ margin: "32px 0 16px" }}>
    <div style={{ paddingLeft: "20px" }}>
      <div style={{ paddingBottom: "10px" }}>
        <h1 style={{ fontSize: "2.75rem", fontWeight: "300" }}>Buttons</h1>
        <p style={{ fontSize: "1.2rem", fontWeight: "400" }}>
          A Button indicates a possible user action.
        </p>
      </div>
      <h2 style={{ fontSize: "2rem", fontWeight: "300" }}>Filled Buttons</h2>
      <p style={{ fontSize: "1rem", fontWeight: "300" }}>
        Use filled buttons to give more prominence to actions in layouts with a
        lot of varying content.
      </p>
    </div>
    <div style={controlledWidth}>
      <div style={halfColumn}>
        <SkinsPrimary />
      </div>
    </div>

    <h2
      style={{
        padding: "20px 0 0px 20px",
        fontSize: "2rem",
        fontWeight: "300",
        margin: "0"
      }}
    >
      Ghost Buttons
    </h2>
    <div style={controlledWidth}>
      <div style={halfColumn}>
        <div style={{ paddingLeft: "10px" }}>
          <p style={{ fontSize: "1rem", fontWeight: "300" }}>
            Ghost button is best used for secondary or tertiary content, since
            it should not compete with your primary call to action.
          </p>
        </div>
        <SkinsSecondary />
      </div>
    </div>
    <div style={{ paddingLeft: "20px" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "300" }}>Icon Buttons</h2>
      <p style={{ fontSize: "1rem", fontWeight: "300" }}>
        An Icon Button should perform a constructive action such as creating a
        new item or sharing the item on screen.
      </p>
    </div>
    <div style={controlledWidth}>
      <div style={halfColumn}>
        <SkinStandard />
        <Sizes />
      </div>
      <div style={halfColumn}>
        <SkinLight />
      </div>
    </div>
    <h2 style={{ paddingLeft: "20px", fontSize: "2rem", fontWeight: "300" }}>
      Sizes
    </h2>
    <div style={controlledWidth}>
      <div style={halfColumn}>
        <Size />
      </div>
      <div style={halfColumn}>
        <Sizes />
      </div>
    </div>
    <h2 style={{ paddingLeft: "20px", fontSize: "2rem", fontWeight: "300" }}>
      Affixes
    </h2>
    <div style={controlledWidth}>
      <div style={halfColumn}>
        <Affixes />
      </div>
    </div>
  </div>
);

export default ButtonsStory;
