import * as React from 'react';
import DropdownLayout from 'wix-style-react/DropdownLayout';
import { dropdownLayoutTestkitFactory } from 'wix-style-react/dist/testkit';
import { dropdownLayoutTestkitFactory as dropdownLayoutEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import { dropdownLayoutTestkitFactory as dropdownLayoutPuppeteerTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function DropdownLayoutWithMandatoryProps() {
  return <DropdownLayout />;
}

function DropdownLayoutWithAllProps() {
  return (
    <DropdownLayout
      closeOnSelect
      dataHook="hook"
      dropDirectionUp
      fixedFooter={<div />}
      fixedHeader={<div />}
      focusOnSelectedOption
      hasMore
      inContainer
      infiniteScroll
      itemHeight="big"
      loadMore={_page => {}}
      markedOption="1"
      maxHeightPixels={200}
      minWidthPixels={100}
      onClickOutside={_ev => {}}
      onClose={() => {}}
      onMouseEnter={_ev => {}}
      onMouseLeave={_ev => {}}
      onOptionMarked={_opt => {}}
      onSelect={(_opt, _samePicked) => {}}
      selectedHighlight
      selectedId="1"
      tabIndex={2}
      styles="font: 12px"
      theme="b2b"
      visible
      withArrow
      overflow="scroll"
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
    />
  );
}

async function testkits() {
  const testkit = dropdownLayoutTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = dropdownLayoutEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await dropdownLayoutPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
