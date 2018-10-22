import * as React from "react";

import { IconButtonPrimary } from "./showcase/iconButton/iconButton-primary";
import { IconButtonSecondary } from "./showcase/iconButton/iconButton-secondary";
import { IconButtonSizes } from "./showcase/iconButton/iconButton-sizes";

import { ButtonPrimary } from "./showcase/button/button-primary";
import { ButtonSecondary } from "./showcase/button/button-secondary";
import { ButtonSizes } from "./showcase/button/button-sizes";
import { ButtonAffixes } from "./showcase/button/button-affixes";

import { TextButtonPrimary } from "./showcase/textButton/textButton-primary";
import { TextButtonSecondary } from "./showcase/textButton/textButton-secondary";
import { TextButtonUnderlined } from "./showcase/textButton/textButton-underlined";
import { TextButtonSizes } from "./showcase/textButton/textButton-sizes";

const controlledWidth = {
  maxWidth: "1254px",
  height: "auto",
  width: "100%",
  display: "flex"
};

const controlledWidthColumn = {
  maxWidth: "1254px",
  height: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  lineHeight: "1.6",
  padding: "10px"
};

const halfColumn = {
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  width: "48%",
  lineHeight: "1.6"
};

const Title = () => (
  <div style={{ padding: "10px", maxWidth: "1254px" }}>
    <h1 style={{ fontSize: "2.75rem", fontWeight: "300" }}>Buttons</h1>
    <p style={{ fontSize: "1.2rem", fontWeight: "300", lineHeight: "1.6" }}>
      The Text Buttons, Filled Buttons, Ghost Buttons, Icon Buttons and Close
      Buttons are built on top of the same component: the ButtonNext. You can
      take advantage of this lower level component to build custom interactions.
    </p>
  </div>
);

const SubContainer = ({ children }) => (
  <div style={controlledWidthColumn}>{children}</div>
);

const SubTitle = ({ children }) => (
  <h2
    style={{
      fontSize: "1.75rem",
      fontWeight: "300",
      margin: "15px 0 15px 0"
    }}
  >
    {children}
  </h2>
);

const SubParagraph = ({ children }) => (
  <p style={{ fontSize: "1rem", fontWeight: "300", marginBottom: "0" }}>
    {children}
  </p>
);

const Container = ({ children }) => (
  <div style={controlledWidth}>{children}</div>
);

const Box = ({ children }) => <div style={halfColumn}>{children}</div>;

const ButtonsStory = () => (
  <div style={{ margin: "0px 0 16px", paddingLeft: "20px" }}>
    <Title />

    <Container>
      <Box>
        <SubTitle>Filled Buttons</SubTitle>
        <SubParagraph>
          Use primary buttons to give more prominence to actions in layouts with
          a lot of varying content.
        </SubParagraph>
        <ButtonPrimary />
      </Box>
      <Box>
        <SubTitle>Ghost Buttons</SubTitle>
        <SubParagraph>
          Secondary button is best used for secondary or tertiary content, since
          it should not compete with your primary call to action.
        </SubParagraph>
        <ButtonSecondary />
      </Box>
    </Container>

    <SubContainer>
      <SubTitle>Icon Buttons</SubTitle>
      <SubParagraph>
        An Icon Button should perform a constructive action such as creating a
        new item or sharing the item on screen.
      </SubParagraph>
    </SubContainer>

    <Container>
      <Box>
        <IconButtonPrimary />
      </Box>
      <Box>
        <IconButtonSecondary />
      </Box>
    </Container>

    <SubContainer>
      <SubTitle>Text Buttons</SubTitle>
      <SubParagraph>
        The major benefit of text buttons is pretty simple — they minimize
        distraction from content.
      </SubParagraph>
    </SubContainer>

    <Container>
      <Box>
        <TextButtonPrimary />
      </Box>
      <Box>
        <TextButtonSecondary />
      </Box>
    </Container>
    <Container>
      <Box>
        <TextButtonUnderlined />
      </Box>
    </Container>

    <SubContainer>
      <SubTitle>Sizes</SubTitle>
    </SubContainer>

    <Container>
      <Box>
        <ButtonSizes />
      </Box>
      <Box>
        <IconButtonSizes />
      </Box>
    </Container>
    <Container>
      <Box>
        <TextButtonSizes />
      </Box>
    </Container>

    <SubTitle>Affixes</SubTitle>
    <Container>
      <Box>
        <ButtonAffixes />
      </Box>
    </Container>
  </div>
);

export default ButtonsStory;
