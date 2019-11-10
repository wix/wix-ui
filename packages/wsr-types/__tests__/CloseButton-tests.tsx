import * as React from 'react';
import CloseButton from 'wix-style-react/CloseButton';
import { closeButtonTestkitFactory } from 'wix-style-react/dist/testkit';
import { closeButtonTestkitFactory as closeButtonEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { closeButtonTestkitFactory as closeButtonPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function CloseButtonWithMandatoryProps() {
  return <CloseButton />;
}

function CloseButtonWithAllProps() {
  return (
    <CloseButton
      as="a"
      className="cls"
      dataHook="hook"
      disabled
      onClick={_ev => {}}
      size="medium"
      skin="dark"
    />
  );
}

async function testkits() {
  const testkit = closeButtonTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = closeButtonEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await closeButtonPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
