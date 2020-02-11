import * as React from 'react';
import AutoCompleteWithLabel from 'wix-style-react/AutoCompleteWithLabel';
import { autoCompleteWithLabelTestkitFactory } from 'wix-style-react/dist/testkit';
import { autoCompleteWithLabelTestkitFactory as autoCompleteWithLabelEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { autoCompleteWithLabelTestkitFactory as autoCompleteWithLabelPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function AutoCompleteWithLabelWithMandatoryProps() {
  return (
    <AutoCompleteWithLabel
      label="label"
      options={[
        {
          value: 'a',
          id: 0,
          disabled: true,
          linkTo: 'google.com',
          title: true,
          overrideStyle: true
        }
      ]}
    />
  );
}

function AutoCompleteWithLabelWithAllProps() {
  return (
    <AutoCompleteWithLabel
      dataHook="hook"
      label="label"
      options={[
        {
          value: 'a',
          id: 0,
          disabled: true,
          linkTo: 'google.com',
          title: true,
          overrideStyle: true
        },
        {
          value: <div />,
          id: 1,
          disabled: true,
          linkTo: 'google.com',
          title: true,
          overrideStyle: true
        },
        { value: '-', id: '2' },
        {
          value: ({ selected, disabled, hovered }) => <div />,
          id: 3,
          disabled: true,
          linkTo: 'google.com',
          title: true,
          overrideStyle: true
        }
      ]}
      suffix={[<span />]}
      status={"warning"}
      statusMessage={<div />}
      onFocus={_ev => {}}
      onBlur={_ev => {}}
      onChange={_ev => {}}
      name="name"
      type="type"
      ariaLabel="aria"
      autoFocus
      autocomplete="autocomplete"
      disabled
      className="classy"
      maxLength={100}
      placeholder="placeholder"
      onSelect={_ev => {}}
      native
    />
  );
}

async function testkits() {
  const testkit = autoCompleteWithLabelTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = autoCompleteWithLabelEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await autoCompleteWithLabelPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
