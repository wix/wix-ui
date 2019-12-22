import * as React from "react";
import SidebarDivider from "wix-style-react/SidebarDivider";
import { sidebarDividerTestkitFactory } from "wix-style-react/dist/testkit";
import { sidebarDividerTestkitFactory as sidebarDividerEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { sidebarDividerTestkitFactory as sidebarDividerPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function SidebarDividerWithMandatoryProps() {
  return <SidebarDivider />;
}

function SidebarDividerWithAllProps() {
  return <SidebarDivider dataHook="hook" fullWidth />;
}

async function testkits() {
  const testkit = sidebarDividerTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = sidebarDividerEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await sidebarDividerPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
