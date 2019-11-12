import * as React from 'react';
import MessageBoxFunctionalLayout from 'wix-style-react/MessageBoxFunctionalLayout';
import { messageBoxFunctionalLayoutTestkitFactory } from 'wix-style-react/dist/testkit';
import { messageBoxFunctionalLayoutTestkitFactory as messageBoxFunctionalLayoutEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { messageBoxFunctionalLayoutTestkitFactory as messageBoxFunctionalLayoutPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function MessageBoxFunctionalLayoutWithMandatoryProps() {
  return <MessageBoxFunctionalLayout />;
}

function MessageBoxFunctionalLayoutWithAllProps() {
  return (
    <MessageBoxFunctionalLayout
      buttonsHeight="large"
      cancelPrefixIcon={<div />}
      cancelSuffixIcon={<div />}
      cancelText="text"
      closeButton
      confirmPrefixIcon={<div />}
      confirmSuffixIcon={<div />}
      confirmText="text"
      dataHook="hook"
      disableCancel
      disableConfirmation
      footerBottomChildren={<div />}
      fullscreen
      hideFooter
      image={<div />}
      margin="10"
      maxHeight="10px"
      noBodyPadding
      onCancel={_ev => {}}
      onClose={_ev => {}}
      onOk={_ev => {}}
      sideActions={<div />}
      styles="font: 14px"
      theme="blue"
      title="title"
      width="10"
      withEmptyState
    />
  );
}

async function testkits() {
  const testkit = messageBoxFunctionalLayoutTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = messageBoxFunctionalLayoutEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await messageBoxFunctionalLayoutPuppeteerTestkitFactory(
    {
      dataHook: 'hook',
      page
    }
  );
}
