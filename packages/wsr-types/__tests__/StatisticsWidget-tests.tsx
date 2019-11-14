import * as React from "react";
import StatisticsWidget from "wix-style-react/StatisticsWidget";
import { statisticsWidgetTestkitFactory } from "wix-style-react/dist/testkit";
import { statisticsWidgetTestkitFactory as statisticsWidgetEnzymeTestkitFactory } from "wix-style-react/dist/testkit/enzyme";
import { statisticsWidgetTestkitFactory as statisticsWidgetPuppeteerTestkitFactory } from "wix-style-react/dist/testkit/puppeteer";
import * as enzyme from "enzyme";
import * as puppeteer from "puppeteer";

function StatisticsWidgetWithMandatoryProps() {
  return <StatisticsWidget />;
}

function StatisticsWidgetWithAllProps() {
  return (
    <StatisticsWidget
      dataHook="hook"
      items={[
        { value: "" },
        {
          value: "val",
          description: "desc",
          descriptionInfo: "desc",
          invertedPercentage: true,
          percentage: 10,
          valueInShort: "val",
          onClick: _ev => {}
        }
      ]}
      statistics={[
        { value: "" },
        {
          value: "val",
          description: "desc",
          descriptionInfo: "desc",
          invertedPercentage: true,
          percentage: 10,
          valueInShort: "val",
          onClick: _ev => {}
        }
      ]}
    />
  );
}

async function testkits() {
  const testkit = statisticsWidgetTestkitFactory({
    dataHook: "hook",
    wrapper: document.createElement("div")
  });

  const enzymeTestkit = statisticsWidgetEnzymeTestkitFactory({
    dataHook: "hook",
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await statisticsWidgetPuppeteerTestkitFactory({
    dataHook: "hook",
    page
  });
}
