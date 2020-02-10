import * as React from 'react';
import InputWithLabel from 'wix-style-react/InputWithLabel';
import { inputWithLabelTestkitFactory } from 'wix-style-react/dist/testkit';
import { inputWithLabelTestkitFactory as inputWithLabelEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { inputWithLabelTestkitFactory as inputWithLabelPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';
import Input from "wix-style-react/Input";

function InputWithLabelWithMandatoryProps() {
  return <InputWithLabel />;
}

function InputWithLabelWithAllProps() {
  return (
    <InputWithLabel
      label="label"
      suffix={[<div />]}
      value={6}
      dataHook="hook"
      status={Input.StatusError}
      statusMessage={<div />}
      onChange={_ev => {}}
      onFocus={_ev => {}}
      onBlur={_ev => {}}
      name="name"
      type="type"
      ariaLabel="aria"
      autoFocus
      autocomplete="autocomplete"
      disabled
      className="class"
      maxLength={100}
      placeholder="placeholder"
      customInput={<span />}
    />
  );
}

async function testkits() {
  const testkit = inputWithLabelTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = inputWithLabelEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await inputWithLabelPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
