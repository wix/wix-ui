import * as React from "react";
import SidebarHeader from "wix-style-react/SidebarHeader";
import { sidebarHeaderTestkitFactory } from "wix-style-react/dist/testkit";
import { sidebarHeaderTestkitFactory as sidebarHeaderEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { sidebarHeaderTestkitFactory as sidebarHeaderPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function SidebarHeaderWithMandatoryProps() {
  return <SidebarHeader />;
}

function SidebarHeaderWithAllProps() {
  return <SidebarHeader dataHook="hook" subtitle="title" title="title" />;
}

async function testkits() {
  const testkit = sidebarHeaderTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = sidebarHeaderEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await sidebarHeaderPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
