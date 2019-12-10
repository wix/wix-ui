import * as React from 'react';
import Tabs from 'wix-style-react/Tabs';
import { tabsTestkitFactory } from 'wix-style-react/dist/testkit';
import { tabsTestkitFactory as tabsEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { tabsTestkitFactory as tabsPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function TabsWithMandatoryProps() {
  return <Tabs items={[{id: 1, title: "tab1", dataHook: "tab-hook"}]}/>;
}

function TabsWithAllProps() {
  return (
    <Tabs
      activeId={"12"}
      dataHook={"hook"}
      hasDivider={true}
      minWidth={11}
      type={"compactSide"}
      sideContent={<div/>}
      width={500}
      onClick={(tab) => {}}
      items={[{id: 1, title: "tab1", dataHook: "tab-hook"}]}
    />
  )
}

async function testkits() {
  const testkit = tabsTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = tabsEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await tabsPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
