import * as React from 'react';
import ErrorIndicator from 'wix-style-react/ErrorIndicator';
import { errorIndicatorTestkitFactory } from 'wix-style-react/dist/testkit';
import { errorIndicatorTestkitFactory as errorIndicatorEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { errorIndicatorTestkitFactory as errorIndicatorPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function ErrorIndicatorWithMandatoryProps() {
  return <ErrorIndicator />;
}

function ErrorIndicatorWithAllProps() {
  return (
    <ErrorIndicator
      dataHook="hook"
      tooltipPlacement="bottom"
      errorMessage="msg"
    />
  );
}

async function testkits() {
  const testkit = errorIndicatorTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = errorIndicatorEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await errorIndicatorPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
