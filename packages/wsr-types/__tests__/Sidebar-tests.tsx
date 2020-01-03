import * as React from "react";
import Sidebar, {
  SidebarContextConsumer,
  SidebarItemContextConsumer
} from "wix-style-react/Sidebar";
import { sidebarTestkitFactory } from "wix-style-react/dist/testkit";
import { sidebarTestkitFactory as sidebarEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { sidebarTestkitFactory as sidebarPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function SidebarWithMandatoryProps() {
  return <Sidebar />;
}

function SidebarWithAllProps() {
  const instance = new Sidebar({});
  instance.setSelectedKey("");

  return (
    <Sidebar
      classNames={{
        content: "cls",
        sideBar: "cls",
        slider: "cls",
        sliderInFromLeft: "cls",
        sliderInFromRight: "cls",
        sliderOutToLeft: "cls",
        sliderOutToRight: "cls"
      }}
      dataHook="hook"
      isHidden
      selectedKey="key"
      skin="dark"
    >
      <Sidebar.BackButton disable onClick={_e => {}}>
        label
      </Sidebar.BackButton>
      <Sidebar.PersistentFooter>asd</Sidebar.PersistentFooter>
      <Sidebar.PersistentHeader>asd</Sidebar.PersistentHeader>
      <Sidebar.Item
        disable
        innerMenu={[<div />]}
        itemKey="key"
        onClick={(_k, _e) => {}}
      >
        asd
      </Sidebar.Item>
    </Sidebar>
  );
}

function SidebarContextConsumerTest() {
  return (
    <SidebarItemContextConsumer>
      {({ selected }) => {
        console.log(selected);
        return <div />;
      }}
    </SidebarItemContextConsumer>
  );
}

function SidebarItemContextConsumerTest() {
  return (
    <SidebarContextConsumer>
      {({ backClicked, getSelectedKey, getSkin, itemClicked }) => {
        console.log(backClicked, getSelectedKey, getSkin, itemClicked);
        return <div />;
      }}
    </SidebarContextConsumer>
  );
}

async function testkits() {
  const testkit = sidebarTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = sidebarEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await sidebarPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
