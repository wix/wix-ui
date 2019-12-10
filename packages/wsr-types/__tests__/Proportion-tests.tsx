import * as React from "react";
import Proportion from "wix-style-react/Proportion";
import { proportionTestkitFactory } from "wix-style-react/dist/testkit";
import { proportionTestkitFactory as proportionEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { proportionTestkitFactory as proportionPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function ProportionWithMandatoryProps() {
  return <Proportion><div>hi there</div></Proportion>
}

function ProportionWithAllProps() {
  return (<Proportion
            dataHook={"hook"}
            className={"class1"}
            aspectRatio={144}>
            <div>hello world</div>
          </Proportion>
  );
}

async function testkits() {
  const testkit = proportionTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = proportionEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await proportionPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
