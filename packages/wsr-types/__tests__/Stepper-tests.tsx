import * as React from "react";
import Stepper from "wix-style-react/Stepper";
import { stepperTestkitFactory } from "wix-style-react/dist/testkit";
import { stepperTestkitFactory as stepperEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { stepperTestkitFactory as stepperPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function StepperWithMandatoryProps() {
  return <Stepper activeStep={1} steps={[{ text: "text" }]} />;
}

function StepperWithAllProps() {
  return (
    <Stepper
      activeStep={1}
      dataHook="hook"
      onClick={_id => {}}
      steps={[{ text: "text", type: "completed" }]}
    />
  );
}

async function testkits() {
  const testkit = stepperTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = stepperEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await stepperPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
