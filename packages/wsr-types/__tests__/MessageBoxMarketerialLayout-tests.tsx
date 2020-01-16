import * as React from "react";
import { MessageBoxMarketerialLayout } from "wix-style-react/MessageBox";
import { messageBoxMarketerialLayoutTestkitFactory } from "wix-style-react/dist/testkit";
import { messageBoxMarketerialLayoutTestkitFactory as messageBoxMarketerialLayoutEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { messageBoxMarketerialLayoutTestkitFactory as messageBoxMarketerialLayoutPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function MessageBoxMarketerialLayoutWithMandatoryProps() {
  return (
    <MessageBoxMarketerialLayout
      content={<div />}
      title={<div />}
      onClose={_ev => {}}
    />
  );
}

function MessageBoxMarketerialLayoutWithAllProps() {
  return (
    <MessageBoxMarketerialLayout
      content={<div />}
      title={<div />}
      onClose={_ev => {}}
      dataHook="hook"
      footerBottomChildren={<div />}
      imageComponent={<div />}
      imageUrl="url"
      onPrimaryButtonClick={_ev => {}}
      onSecondaryButtonClick={_ev => {}}
      primaryButtonDisabled
      primaryButtonLabel="label"
      primaryButtonTheme="blue"
      primaryButtonNode={<div />}
      removeButtonsPadding
      secondaryButtonLabel="label"
      styles="font: 14px"
      theme="blue"
      width="300px"
      noBodyPadding
    />
  );
}

async function testkits() {
  const testkit = messageBoxMarketerialLayoutTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = messageBoxMarketerialLayoutEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await messageBoxMarketerialLayoutPuppeteerTestkitFactory(
    {
      dataHook: "hook",
      page
    }
  );
}
