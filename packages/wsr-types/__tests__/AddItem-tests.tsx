import * as React from 'react';
import AddItem from 'wix-style-react/AddItem';
import { addItemTestkitFactory } from 'wix-style-react/dist/testkit';
import { addItemTestkitFactory as addItemEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { addItemTestkitFactory as addItemPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function AddItemWithMandatoryProps() {
  return <AddItem />;
}

function AddItemWithAllProps() {
  return (
    <AddItem
      alignItems="center"
      dataHook="hook"
      disabled
      onClick={_ev => {}}
      removePadding
      showIcon
      size="large"
      theme="dashes"
      tooltipAppendTo="parent"
      tooltipContent="asd"
      tooltipFixed
      tooltipFlip
      tooltipPlacement="top"
      tooltipProps={{}}
    />
  );
}

async function testkits() {
  const testkit = addItemTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = addItemEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await addItemPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
