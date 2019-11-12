import * as React from 'react';
import Tag from 'wix-style-react/Tag';
import { tagTestkitFactory } from 'wix-style-react/dist/testkit';
import { tagTestkitFactory as tagEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { tagTestkitFactory as tagPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function TagWithMandatoryProps() {
  return <Tag id="asd">text</Tag>;
}

function TagWithAllProps() {
  return (
    <Tag
      id="asd"
      className="cls"
      disabled
      maxWidth={1}
      onClick={_ev => {}}
      onRemove={_id => {}}
      removable
      size="large"
      theme="dark"
      thumb={<div />}>
      text
    </Tag>
  );
}

async function testkits() {
  const testkit = tagTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = tagEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await tagPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
