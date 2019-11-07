import * as React from 'react';
import Page from 'wix-style-react/Page';
import { pageTestkitFactory } from 'wix-style-react/dist/testkit';
import { pageTestkitFactory as pageEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { pageTestkitFactory as pagePuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function PageOldWithMandatoryProps() {
  return <Page />;
}

function PageOldWithAllProps() {
  return (
    <Page
      backgroundImageUrl=""
      className="cls"
      dataHook="hook"
      gradientClassName="cls"
      gradientCoverTail
      maxWidth={200}
      minWidth={100}
      scrollableContentRef={_ref => {}}
      sidePadding={10}
      styles="font: 14px"
    />
  );
}

function PageNewWithMandatoryProps() {
  return <Page upgrade />;
}

function PageNewWithAllProps() {
  return (
    <Page
      upgrade
      backgroundImageUrl=""
      className="cls"
      dataHook="hook"
      gradientClassName="cls"
      height="100px"
      maxWidth={200}
      minWidth={100}
      scrollableContentRef={_ref => {}}
      sidePadding={10}
      styles="font: 14px"
      zIndex={2}>
      <Page.Header className="cls" />
      <Page.Content fullScreen>asd</Page.Content>
      <Page.FixedContent>
        <span>asd</span>
      </Page.FixedContent>
      <Page.Tail>
        <span>asdads</span>
      </Page.Tail>
      <Page.Sticky>
        <span>asd</span>
      </Page.Sticky>
      <Page.Sticky>{({ className, style }) => <span>asd</span>}</Page.Sticky>
    </Page>
  );
}

async function testkits() {
  const testkit = pageTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = pageEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await pagePuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
