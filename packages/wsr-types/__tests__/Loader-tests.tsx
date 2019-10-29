import * as React from 'react';
import Loader from 'wix-style-react/Loader';
import { loaderTestkitFactory } from 'wix-style-react/dist/testkit';
import { loaderTestkitFactory as loaderEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { loaderTestkitFactory as loaderPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function LoaderWithMandatoryProps() {
  return <Loader />;
}

function LoaderWithAllProps() {
  return (
    <Loader
      color="blue"
      dataHook="hook"
      size="large"
      status="error"
      statusMessage="msg"
      text="text"
      shouldLoadAsync
    />
  );
}

async function testkits() {
  const testkit = loaderTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = loaderEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await loaderPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
