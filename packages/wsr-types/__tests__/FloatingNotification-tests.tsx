import * as React from "react";
import FloatingNotification from "wix-style-react/FloatingNotification";
import { floatingNotificationTestkitFactory } from "wix-style-react/dist/testkit";
import { floatingNotificationTestkitFactory as floatingNotificationEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { floatingNotificationTestkitFactory as floatingNotificationPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function FloatingNotificationWithMandatoryProps() {
  return <FloatingNotification />;
}

function FloatingNotificationWithAllProps() {
  return (
    <FloatingNotification
      buttonProps={{ label: <div />, onClick: () => {} }}
      className="cls"
      dataHook="hook"
      onClose={_ev => {}}
      prefixIcon={<div />}
      showCloseButton
      text={<div />}
      textButtonProps={{
        as: "a",
        href: "",
        target: "",
        label: <div />,
        onClick: _ev => {}
      }}
      type="destructive"
      width="10px"
    />
  );
}

async function testkits() {
  const testkit = floatingNotificationTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = floatingNotificationEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await floatingNotificationPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
