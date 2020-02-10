import * as React from 'react';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import { toggleSwitchTestkitFactory } from 'wix-style-react/dist/testkit';
import { toggleSwitchTestkitFactory as toggleSwitchEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { toggleSwitchTestkitFactory as toggleSwitchPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function ToggleSwitchWithMandatoryProps() {
  return <ToggleSwitch />;
}

function ToggleSwitchWithAllProps() {
  return (
    <ToggleSwitch
      dataHook="hook"
      skin="standard"
      size="small"
      checked
      disabled
      id='toggle-id'
      onChange={() => null}
      tabIndex={1}
    />
  );
}


async function testkits() {
  const testkit = toggleSwitchTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = toggleSwitchEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await toggleSwitchPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
