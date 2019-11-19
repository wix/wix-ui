import * as React from "react";
import Highlighter from "wix-style-react/Highlighter";
import { highlighterTestkitFactory } from "wix-style-react/dist/testkit";
import { highlighterTestkitFactory as highlighterEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { highlighterTestkitFactory as highlighterPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";

function HighlighterWithMandatoryProps() {
  return <Highlighter />;
}

function HighlighterWithAllProps() {
  return <Highlighter dataHook="hook" styles="font: 14px" match="abc" />;
}

async function testkits() {
  const testkit = highlighterTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = highlighterEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });
}
