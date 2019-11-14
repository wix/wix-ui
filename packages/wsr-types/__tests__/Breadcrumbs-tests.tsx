import * as React from "react";
import Breadcrumbs from "wix-style-react/Breadcrumbs";
import { breadcrumbsTestkitFactory } from "wix-style-react/dist/testkit";
import { breadcrumbsTestkitFactory as breadcrumbsEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { breadcrumbsTestkitFactory as breadcrumbsPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function BreadcrumbsWithMandatoryProps() {
  return (
    <Breadcrumbs
      items={[
        {
          customElement: <div />,
          disabled: false,
          id: 1,
          link: "link",
          value: <div />
        }
      ]}
    />
  );
}

function BreadcrumbsWithAllProps() {
  return (
    <Breadcrumbs
      activeId="1"
      dataHook="hook"
      styles="font: 14px"
      onClick={_ev => {}}
      size="large"
      theme="onDarkBackground"
      items={[
        {
          customElement: <div />,
          disabled: false,
          id: 1,
          link: "link",
          value: <div />
        }
      ]}
    />
  );
}

async function testkits() {
  const testkit = breadcrumbsTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = breadcrumbsEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await breadcrumbsPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
