import * as React from "react";
import PopoverMenu from "wix-style-react/PopoverMenu";
import { popoverMenuTestkitFactory } from "wix-style-react/dist/testkit";
import { popoverMenuTestkitFactory as popoverMenuEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import * as enzyme from "enzyme";

function PopoverMenuWithMandatoryProps() {
  return <PopoverMenu />;
}

function PopoverMenuWithAllProps() {
  return (
    <PopoverMenu
      appendTo="parent"
      appendToParent
      buttonHeight="small"
      buttonTheme="icon-greybackground"
      maxWidth="100"
      moveBy={{ x: 10, y: 10 }}
      onHide={() => {}}
      onShow={() => {}}
      placement="bottom"
      showArrow
      size="large"
      zIndex={1}
    ></PopoverMenu>
  );
}

async function testkits() {
  const testkit = popoverMenuTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = popoverMenuEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });
}
