import * as React from "react";
import ColorPicker from "wix-style-react/ColorPicker";
import { colorPickerTestkitFactory } from "wix-style-react/dist/testkit";
import { colorPickerTestkitFactory as colorPickerEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { colorPickerTestkitFactory as colorPickerPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function ColorPickerWithMandatoryProps() {
  return <ColorPicker
            value={"blue"}
            onChange={(color) => {}}
            onCancel={(color) => {}}
            onConfirm={(color) => {}}
  />;
}

function ColorPickerWithAllProps() {
  return (<ColorPicker
      dataHook={"datahook"}
      value={"blue"}
      showHistory={true}
      showConverter={false}
      showInput={false}
      onChange={(color) => {}}
      onCancel={(color) => {}}
      onConfirm={(color) => {}}
      onAdd={(color) => {}}
      addTooltipContent={<div/>}
      allowEmpty={true}
      emptyPlaceholder={"i am a placeholder"}
    />
  );
}

async function testkits() {
  const testkit = colorPickerTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = colorPickerEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await colorPickerPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
