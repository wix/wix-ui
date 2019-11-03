import * as React from 'react';
import TextButton from 'wix-style-react/TextButton';
import { textButtonTestkitFactory } from 'wix-style-react/dist/testkit';
import { textButtonTestkitFactory as textButtonEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { textButtonTestkitFactory as textButtonPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function TextButtonWithMandatoryProps() {
  return <TextButton />;
}

function TextButtonWithAllProps() {
  return (
    <TextButton
      as="a"
      className="cls"
      dataHook="hook"
      disabled
      onClick={_ => {}}
      prefixIcon={<div />}
      size="medium"
      skin="dark"
      suffixIcon={<div />}
      target="www.google.com"
      underline="always"
      weight="normal"
    />
  );
}

async function testkits() {
  const testkit = textButtonTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = textButtonEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await textButtonPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
