import * as React from 'react';
import VerticalTabsItem from 'wix-style-react/VerticalTabsItem';
import { verticalTabsItemTestkitFactory } from 'wix-style-react/dist/testkit';
import { verticalTabsItemTestkitFactory as verticalTabsItemEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { verticalTabsItemTestkitFactory as verticalTabsItemPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function VerticalTabsItemWithMandatoryProps() {
  return <VerticalTabsItem />;
}

function VerticalTabsItemWithAllProps() {
  return (
    <VerticalTabsItem
      dataHook="hook"
      disabled
      id={1}
      prefixIcon={<div />}
      suffixIcon={<div />}
      type="action"
    />
  );
}

async function testkits() {
  const testkit = verticalTabsItemTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = verticalTabsItemEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await verticalTabsItemPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
