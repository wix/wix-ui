import * as React from "react";
import Thumbnail from "wix-style-react/Thumbnail";
import { thumbnailTestkitFactory } from "wix-style-react/dist/testkit";
import { thumbnailTestkitFactory as thumbnailEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { thumbnailTestkitFactory as thumbnailPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function ThumbnailWithMandatoryProps() {
  return <Thumbnail />;
}

function ThumbnailWithAllProps() {
  return (
    <Thumbnail
      dataHook="hook"
      title = {"some title"}
      description={<div>desc</div>}
      image={<div>image</div>}
      selected
      disabled
      hideSelectedIcon
      backgroundImage={<div/>}
      onClick={_ev => {}}
      width={"10px"}
      height={"10px"}
    />
  );
}

async function testkits() {
  const testkit = thumbnailTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = thumbnailEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await thumbnailPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
