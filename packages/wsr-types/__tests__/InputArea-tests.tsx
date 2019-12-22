import * as React from "react";
import InputArea from "wix-style-react/InputArea";
import { inputAreaTestkitFactory } from "wix-style-react/dist/testkit";
import { inputAreaTestkitFactory as inputAreaEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { inputAreaTestkitFactory as inputAreaPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function inputAreaWithMandatoryProps() {
  return <InputArea />;
}

function InputAreaWithAllProps() {
  return (
    <InputArea
      ariaControls="c"
      ariaDescribedby="c"
      ariaLabel="c"
      autoFocus
      autoGrow
      autoSelect
      dataHook="hook"
      rows={InputArea.MIN_ROWS}
      defaultValue="value"
      disabled
      error
      errorMessage="err"
      forceFocus
      forceHover
      hasCounter
      id="id"
      maxHeight="10px"
      maxLength={10}
      menuArrow
      minHeight="10px"
      minRowsAutoGrow={2}
      name="name"
      onBlur={_ev => {}}
      onChange={_ev => {}}
      onClear={() => {}}
      onEnterPressed={() => {}}
      onEscapePressed={() => {}}
      onFocus={_ev => {}}
      onKeyDown={_ev => {}}
      onKeyUp={_ev => {}}
      onTooltipShow={() => {}}
      placeholder="placeholder"
      readOnly
      resizable
      size="normal"
      style="amaterial"
      styles="font: 14px"
      tabIndex={4}
      theme="amaterial"
      tooltipPlacement="top"
      value="value"
    />
  );
}

async function testkits() {
  const testkit = inputAreaTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = inputAreaEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });
  document.querySelector("textarea")!.disabled;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await inputAreaPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
