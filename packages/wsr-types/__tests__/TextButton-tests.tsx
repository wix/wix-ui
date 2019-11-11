import * as React from 'react';
import TextButton from 'wix-style-react/TextButton';
import Checkbox from 'wix-style-react/Checkbox';
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
      href="foobar"
      weight="normal"
    />
  );
}

function ShouldHaveDefaultButtonProps() {
  return <TextButton type="reset" />;
}

function SHouldHaveButtonProps() {
  return <TextButton as="button" type="submit" />;
}

function ShouldHaveAnchorProps() {
  return <TextButton as="a" href="www.google.com" />;
}

function ShouldHaveGenericProps() {
  return <TextButton as="div" tabIndex={1} />;
}

function ShouldHaveComponentProps() {
  return <TextButton as={Checkbox} onClick={_ev => {}} />;
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
