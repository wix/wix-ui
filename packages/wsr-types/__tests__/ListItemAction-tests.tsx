import * as React from 'react';
import ListItemAction, {
  listItemActionBuilder
} from 'wix-style-react/ListItemAction';
import { listItemActionTestkitFactory } from 'wix-style-react/dist/testkit';
import { listItemActionTestkitFactory as listItemActionEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { listItemActionTestkitFactory as listItemActionPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function ListItemActionWithMandatoryProps() {
  return <ListItemAction title="asd" />;
}

function ListItemActionWithAllProps() {
  return (
    <ListItemAction
      title="title"
      dataHook="hook"
      skin="dark"
      size="medium"
      prefixIcon={<div />}
      autoFocus
      ellipsis
      disabled
      tooltipModifiers={{ fixed: true }}
      as="button"
      onClick={_ev => {}}
    />
  );
}

function ListItemActionBuilderWithAllProps() {
  const { disabled, id, overrideStyle, value } = listItemActionBuilder({
    autoFocus: true,
    as: 'button',
    className: 'cls',
    dataHook: 'hook',
    disabled: true,
    ellipsis: true,
    id: '1',
    onClick: _ev => {},
    prefixIcon: <div />,
    size: 'medium',
    skin: 'dark',
    tabIndex: 1,
    title: 'title'
  });

  value({as: 'a', href: ''})
}

async function testkits() {
  const testkit = listItemActionTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = listItemActionEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await listItemActionPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
