import * as React from 'react';
import VerticalTabs from 'wix-style-react/VerticalTabs';
import { verticalTabsTestkitFactory } from 'wix-style-react/dist/testkit';
import { verticalTabsTestkitFactory as verticalTabsEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { verticalTabsTestkitFactory as verticalTabsPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function VerticalTabsWithMandatoryProps() {
  return <VerticalTabs />;
}

function VerticalTabsWithAllProps() {
  return (
    <VerticalTabs
      activeTabId={1}
      dataHook="hook"
      onChange={_id => {}}
      size="medium"
    >
      <VerticalTabs.TabsGroup title="ads">
        <VerticalTabs.TabItem
          dataHook="hook"
          disabled
          id={2}
          prefixIcon={<div />}
          suffixIcon={<div />}
          type="action"
        />
      </VerticalTabs.TabsGroup>
      <VerticalTabs.Footer>asd</VerticalTabs.Footer>
    </VerticalTabs>
  );
}

async function testkits() {
  const testkit = verticalTabsTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = verticalTabsEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await verticalTabsPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
