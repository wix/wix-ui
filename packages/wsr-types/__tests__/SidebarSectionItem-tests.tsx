import * as React from "react";
import SidebarSectionItem from "wix-style-react/SidebarSectionItem";
import { sidebarSectionItemTestkitFactory } from "wix-style-react/dist/testkit";
import { sidebarSectionItemTestkitFactory as sidebarSectionItemEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { sidebarSectionItemTestkitFactory as sidebarSectionItemPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function SidebarSectionItemWithMandatoryProps() {
  return <SidebarSectionItem>asd</SidebarSectionItem>;
}

function SidebarSectionItemWithAllProps() {
  return (
    <SidebarSectionItem
      alwaysDisplayChevron
      dataHook="hook"
      disabled
      drillable
      onClick={_ev => {}}
      prefix={<div />}
      selected
      suffix={<div />}
    >
      asd
    </SidebarSectionItem>
  );
}

async function testkits() {
  const testkit = sidebarSectionItemTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = sidebarSectionItemEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await sidebarSectionItemPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
