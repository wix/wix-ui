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

const Title = () => (
  <div style={{ paddingBottom: "10px" }}>
    <h1 style={{ fontSize: "2.75rem", fontWeight: "300" }}>Buttons</h1>
    <p style={{ fontSize: "1.2rem", fontWeight: "300" }}>
      A Button indicates a possible user action.
    </p>
  </div>
);

const SubTitle = ({ children }) => (
  <h2 h2 style={{ fontSize: "1.75rem", fontWeight: "300" }}>
    {children}
  </h2>
);

const SubParagraph = ({ children }) => (
  <p style={{ fontSize: "1rem", fontWeight: "300" }}>{children}</p>
);
const Container = ({ children }) => (
  <div style={controlledWidth}>{children}</div>
);

const Box = ({ children }) => <div style={halfColumn}>{children}</div>;

const ButtonsStory = () => (
  <div style={{ margin: "32px 0 16px", paddingLeft: "20px" }}>
    <Box>
      <Title />
    </Box>
    <Container>
      <Box>
        <SubTitle>Filled Buttons</SubTitle>
        <SubParagraph>
          Use filled buttons to give more prominence to actions in layouts with
          a lot of varying content.
        </SubParagraph>
        <SkinsPrimary />
      </Box>
      <Box>
        <SubTitle>Ghost Buttons</SubTitle>
        <SubParagraph>
          Ghost button is best used for secondary or tertiary content, since it
          should not compete with your primary call to action.
        </SubParagraph>
        <SkinsSecondary />
      </Box>
    </Container>

    <Box>
      <SubTitle>Icon Buttons</SubTitle>
      <SubParagraph>
        An Icon Button should perform a constructive action such as creating a
        new item or sharing the item on screen.
      </SubParagraph>
    </Box>
    <Container>
      <Box>
        <SkinStandard />
      </Box>
      <Box>
        <SkinLight />
      </Box>
    </Container>

    <SubTitle>Sizes</SubTitle>
    <Container>
      <Box>
        <Size />
      </Box>
      <Box>
        <Sizes />
      </Box>
    </Container>

    <SubTitle>Affixes</SubTitle>
    <Container>
      <Box>
        <Affixes />
      </Box>
    </Container>
  </div>
);

export default ButtonsStory;
