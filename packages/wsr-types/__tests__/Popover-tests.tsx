import * as React from "react";
import Popover from "wix-style-react/Popover";
import { popoverTestkitFactory } from "wix-style-react/dist/testkit";
import { popoverTestkitFactory as popoverEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { popoverTestkitFactory as popoverPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function PopoverWithMandatoryProps() {
  return <Popover shown placement="auto" />;
}

function PopoverWithAllProps() {
  return (
    <Popover
      animate
      appendTo="parent"
      className="cls"
      customArrow={(_p, _a) => <div />}
      dataHook="hook"
      disableClickOutsideWhenClosed
      dynamicWidth
      fixed
      flip
      hideDelay={500}
      id="id"
      maxWidth="100"
      minWidth="100"
      moveArrowTo={5}
      moveBy={{ x: 1, y: 1 }}
      onClick={_ev => {}}
      onClickOutside={() => {}}
      onKeyDown={_ev => {}}
      onMouseEnter={_ev => {}}
      onMouseLeave={_ev => {}}
      placement="auto"
      role="ads"
      showArrow
      showDelay={500}
      shown
      style={{ width: 10 }}
      theme="dark"
      timeout={100}
      zIndex={1}
      width={100}
    >
      <Popover.Content>text</Popover.Content>
      <Popover.Element>click me</Popover.Element>
    </Popover>
  );
}

async function testkits() {
  const testkit = popoverTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = popoverEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await popoverPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
