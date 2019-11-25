import * as React from "react";
import SegmentedToggle from "wix-style-react/SegmentedToggle";
import { segmentedToggleTestkitFactory } from "wix-style-react/dist/testkit";
import { segmentedToggleTestkitFactory as segmentedToggleEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { segmentedToggleTestkitFactory as segmentedTogglePuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function SegmentedToggleWithMandatoryProps() {
  return <SegmentedToggle>{[]}</SegmentedToggle>;
}

function SegmentedToggleWithAllProps() {
  return (
    <SegmentedToggle
      dataHook="hook"
      defaultSelected={<div />}
      disabled
      onClick={(_ev, value) => {}}
      selected
    >
      <SegmentedToggle.Button
        disabled
        prefixIcon={<div />}
        selected
        value="val"
        onClick={_ev => {}}
        dataHook="hook"
        focusableOnBlur={_ev => {}}
        focusableOnFocus={_ev => {}}
      >
        text
      </SegmentedToggle.Button>
      <SegmentedToggle.Icon
        disabled
        selected
        tooltipText="text"
        value="val"
        onClick={_ev => {}}
        dataHook="hook"
        focusableOnBlur={_ev => {}}
        focusableOnFocus={_ev => {}}
        {...{ "data-click": "foo" }}
      >
        <div />
      </SegmentedToggle.Icon>
    </SegmentedToggle>
  );
}

async function testkits() {
  const testkit = segmentedToggleTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = segmentedToggleEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await segmentedTogglePuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
