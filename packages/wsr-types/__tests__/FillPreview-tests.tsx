import * as React from 'react';
import FillPreview from 'wix-style-react/FillPreview';
import { fillPreviewTestkitFactory } from 'wix-style-react/dist/testkit';
import { fillPreviewTestkitFactory as fillPreviewEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { fillPreviewTestkitFactory as fillPreviewPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function FillPreviewWithMandatoryProps() {
  return <FillPreview />;
}

function FillPreviewWithAllProps() {
  return (
    <FillPreview
      as={"a"}
      href={"http://www.wix.com"}
      tabIndex={-1}
      aspectRatio={1}
      disabled
      fill="blue"
      selected
      onClick={() => {}}
    />
  );
}

async function testkits() {
  const testkit = fillPreviewTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = fillPreviewEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await fillPreviewPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
