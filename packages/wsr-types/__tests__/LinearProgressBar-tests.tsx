import * as React from 'react';
import LinearProgressBar from 'wix-style-react/LinearProgressBar';
import { linearProgressBarTestkitFactory } from 'wix-style-react/dist/testkit';
import { linearProgressBarTestkitFactory as linearProgressBarEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { linearProgressBarTestkitFactory as linearProgressBarPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function LinearProgressBarWithMandatoryProps() {
  return <LinearProgressBar />;
}

function LinearProgressBarWithAllProps() {
  return (
    <LinearProgressBar
      error
      errorMessage="msg"
      light
      shouldLoadAsync
      showProgressIndication
      value={40}
      skin="success"
    />
  );
}

async function testkits() {
  const testkit = linearProgressBarTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = linearProgressBarEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await linearProgressBarPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
