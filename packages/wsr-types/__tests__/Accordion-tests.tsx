import * as React from "react";
import Accordion from "wix-style-react/Accordion";
import { accordionTestkitFactory } from "wix-style-react/dist/testkit";
import { accordionTestkitFactory as accordionEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { accordionTestkitFactory as accordionPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function AccordionWithMandatoryProps() {
  return <Accordion />;
}

function AccordionWithAllProps() {
  return (
    <Accordion
      dataHook="hook"
      multiple
      skin="light"
      items={[
        {
          buttonType: "button",
          collapseLabel: <div />,
          content: <div />,
          expandLabel: <div />,
          icon: <div />,
          title: <div />,
          skin: "light"
        }
      ]}
    />
  );
}

async function testkits() {
  const testkit = accordionTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = accordionEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await accordionPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
