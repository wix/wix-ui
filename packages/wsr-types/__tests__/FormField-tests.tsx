import * as React from 'react';
import FormField from 'wix-style-react/FormField';
import { formFieldTestkitFactory } from 'wix-style-react/dist/testkit';
import { formFieldTestkitFactory as formFieldEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { formFieldTestkitFactory as formFieldPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function FormFieldWithMandatoryProps() {
  return <FormField />;
}

function FormFieldWithAllProps() {
  return (
    <FormField
      charCount={200}
      dataHook="hook"
      id="1"
      infoContent={<div />}
      infoTooltipProps={{}}
      label="label"
      labelPlacement="left"
      labelSize="medium"
      required
      stretchContent
    />
  );
}

function FormFieldWithChildrenAsFunction() {
  return (
    <FormField>
      {({ setCharactersLeft }) => {
        setCharactersLeft(10);
        return <span></span>;
      }}
    </FormField>
  );
}

async function testkits() {
  const testkit = formFieldTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = formFieldEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await formFieldPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
