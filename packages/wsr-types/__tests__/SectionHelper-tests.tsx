import * as React from 'react';
import SectionHelper from 'wix-style-react/SectionHelper';
import { sectionHelperTestkitFactory } from 'wix-style-react/dist/testkit';
import { sectionHelperTestkitFactory as sectionHelperEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { sectionHelperTestkitFactory as sectionHelperPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function SectionHelperWithMandatoryProps() {
  return <SectionHelper />;
}

function SectionHelperWithAllProps() {
  return (
    <SectionHelper
      actionText="text"
      appearance="danger"
      dataHook="hook"
      styles="font: 14px"
      fullWidth
      onAction={_ev => {}}
      onClose={_ev => {}}
      showCloseButton
      title="title"
    />
  );
}

async function testkits() {
  const testkit = sectionHelperTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = sectionHelperEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await sectionHelperPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
