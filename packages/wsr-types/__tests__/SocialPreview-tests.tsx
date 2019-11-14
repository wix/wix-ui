import * as React from 'react';
import SocialPreview from 'wix-style-react/SocialPreview';
import { socialPreviewTestkitFactory } from 'wix-style-react/dist/testkit';
import { socialPreviewTestkitFactory as socialPreviewEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { socialPreviewTestkitFactory as socialPreviewPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function SocialPreviewWithMandatoryProps() {
  return <SocialPreview />;
}

function SocialPreviewWithAllProps() {
  return (
    <SocialPreview
     dataHook="hook"
     description="description"
     media={<div />}
     previewUrl="url"
     title="title"
    />
  );
}

async function testkits() {
  const testkit = socialPreviewTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = socialPreviewEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await socialPreviewPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
