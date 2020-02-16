import * as React from 'react';
import Checkbox from 'wix-style-react/Checkbox';
import { checkboxTestkitFactory } from 'wix-style-react/dist/testkit';
import { checkboxTestkitFactory as checkboxEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { checkboxTestkitFactory as checkboxPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function CheckboxWithMandatoryProps() {
  return <Checkbox />;
}

function CheckboxWithAllProps() {
  return (
    <Checkbox
      checked
      disabled
      errorMessage="error"
      dataHook="hook"
      hasError
      hover
      id="1"
      indeterminate
      onChange={_ev => {}}
      selectionArea="hover"
      size="medium"
      styles="font: 14px"
      vAlign="center"
      className="some-class"
    />
  );
}

async function testkits() {
  const testkit = checkboxTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = checkboxEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await checkboxPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
