import * as React from "react";
import GooglePreview from "wix-style-react/GooglePreview";
import { googlePreviewTestkitFactory } from "wix-style-react/dist/testkit";
import { googlePreviewTestkitFactory as googlePreviewEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { googlePreviewTestkitFactory as googlePreviewPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function GooglePreviewWithMandatoryProps() {
  return <GooglePreview />;
}

function GooglePreviewWithAllProps() {
  return (
    <GooglePreview
      dataHook="hook"
      description="desc"
      previewUrl="url"
      title="title"
    />
  );
}

async function testkits() {
  const testkit = googlePreviewTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = googlePreviewEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await googlePreviewPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
