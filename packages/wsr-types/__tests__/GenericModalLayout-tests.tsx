import * as React from 'react';
import GenericModalLayout from 'wix-style-react/GenericModalLayout';
import { genericModalLayoutTestkitFactory } from 'wix-style-react/dist/testkit';
import { genericModalLayoutTestkitFactory as genericModalLayoutEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { genericModalLayoutTestkitFactory as genericModalLayoutPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function GenericModalLayoutWithMandatoryProps() {
  return <GenericModalLayout />;
}

function GenericModalLayoutWithAllProps() {
  return (
    <GenericModalLayout
      content={<div />}
      dataHook="hook"
      footer={<div />}
      fullscreen
      header={<div />}
      styles="font: 14px"
    />
  );
}

async function testkits() {
  const testkit = genericModalLayoutTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = genericModalLayoutEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await genericModalLayoutPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
