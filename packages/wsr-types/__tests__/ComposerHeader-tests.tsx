import * as React from 'react';
import ComposerHeader from 'wix-style-react/ComposerHeader';
import Button from 'wix-style-react/Button';
import { composerHeaderTestkitFactory } from 'wix-style-react/dist/testkit';
import { composerHeaderTestkitFactory as composerHeaderEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { composerHeaderTestkitFactory as composerHeaderPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function ComposerHeaderWithMandatoryProps() {
  return <ComposerHeader />;
}

function ComposerHeaderWithAllProps() {
  return (
    <ComposerHeader
      dataHook="hook"
      backButtonValue={<div />}
      onBackClick={_ev => {}}
      size="small"
      dropShadow
    >
      <ComposerHeader.MainActions>
        <Button skin="inverted">Preview</Button>
        <Button>Next</Button>
      </ComposerHeader.MainActions>
      <ComposerHeader.SaveStatus
        saveStatusValue={'val'}
        size={'small'}
        dataHook={'hook'}
        saveStatusError={'error'}
      />
      <ComposerHeader.Actions/>
    </ComposerHeader>
  );
}

async function testkits() {
  const testkit = composerHeaderTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = composerHeaderEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await composerHeaderPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
