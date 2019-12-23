import * as React from "react";
import ListItemAction from "wix-style-react/ListItemAction";
import { listItemActionTestkitFactory } from "wix-style-react/dist/testkit";
import { listItemActionTestkitFactory as listItemActionEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { listItemActionTestkitFactory as listItemActionPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function ListItemActionWithMandatoryProps() {
  return <ListItemAction title="title" />;
}

function ListItemActionWithAllProps() {
  return (
    <ListItemAction
      as="a"
      target="_blank"
      dataHook="hook"
      skin="dark"
      size="medium"
      prefixIcon={<div />}
      autoFocus
      ellipsis
      disabled
      tooltipModifiers={{}}
      title="asd"
    />
  );
}

async function testkits() {
  const testkit = listItemActionTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = listItemActionEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await listItemActionPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
