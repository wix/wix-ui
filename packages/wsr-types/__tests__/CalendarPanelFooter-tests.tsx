import * as React from "react";
import CalendarPanelFooter from "wix-style-react/CalendarPanelFooter";
import { calendarPanelFooterTestkitFactory } from "wix-style-react/dist/testkit";
import { calendarPanelFooterTestkitFactory as calendarPanelFooterEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { calendarPanelFooterTestkitFactory as calendarPanelFooterPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function CalendarPanelFooterWithMandatoryProps() {
  return <CalendarPanelFooter
    primaryActionLabel={"str"}
    secondaryActionLabel={"str"}
    primaryActionDisabled={true}
    primaryActionOnClick={_ev=>{}}
    secondaryActionOnClick={_ev=>{}}/>;
}

function CalendarPanelFooterWithAllProps() {
  return (
    <CalendarPanelFooter
      dataHook="hook"
      primaryActionLabel={"str"}
      secondaryActionLabel={"str"}
      primaryActionDisabled={true}
      primaryActionOnClick={_ev=>{}}
      secondaryActionOnClick={_ev=>{}}
    />
  );
}

async function testkits() {
  const testkit = calendarPanelFooterTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = calendarPanelFooterEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await calendarPanelFooterPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
