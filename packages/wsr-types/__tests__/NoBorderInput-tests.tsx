import * as React from "react";
import NoBorderInput from "wix-style-react/NoBorderInput";
import { noBorderInputTestkitFactory } from "wix-style-react/dist/testkit";
import { noBorderInputTestkitFactory as noBorderInputEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { noBorderInputTestkitFactory as noBorderInputPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function NoBorderInputWithMandatoryProps() {
  return <NoBorderInput />;
}

function NoBorderInputWithAllProps() {
  return (
    <NoBorderInput
      label="label"
      status="error"
      ariaControls="label"
      ariaDescribedby="label"
      ariaLabel="text"
      autoFocus
      autoSelect
      autocomplete="off"
      className="cls"
      clearButton
      customInput={<span />}
      dataHook="hook"
      defaultValue="value"
      disableEditing
      disabled
      error
      errorMessage="msg"
      forceFocus
      forceHover
      help
      helpMessage="msg"
      hideStatusSuffix
      id="1"
      max={10}
      maxLength={100}
      menuArrow
      min={5}
      name="name"
      noLeftBorderRadius
      noRightBorderRadius
      onBlur={_ev => {}}
      onChange={_ev => {}}
      onClear={_ev => {}}
      onCompositionChange={_isComposing => {}}
      onEnterPressed={_ev => {}}
      onEscapePressed={_ev => {}}
      onFocus={_ev => {}}
      onInputClicked={_ev => {}}
      onKeyDown={_ev => {}}
      onKeyUp={_ev => {}}
      onPaste={_ev => {}}
      onTooltipShow={() => {}}
      placeholder="placeholder"
      prefix={<div />}
      readOnly
      ref={React.createRef()}
      required
      roundInput
      rtl
      size="large"
      statusMessage="msg"
      step={1}
      suffix={<div />}
      tabIndex={0}
      textOverflow="clip"
      theme="amaterial"
      title="title"
      tooltipPlacement="auto"
      type="text"
      updateControlledOnClear
      value="value"
      withSelection
    />
  );
}

async function testkits() {
  const testkit = noBorderInputTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = noBorderInputEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await noBorderInputPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
