import * as React from 'react';
import ModalSelectorLayout, {
  ModalSelectorLayoutItem
} from 'wix-style-react/ModalSelectorLayout';
import { modalSelectorLayoutTestkitFactory } from 'wix-style-react/dist/testkit';
import { modalSelectorLayoutTestkitFactory as modalSelectorLayoutEnzymeTestkitFactory } from 'wix-style-react/dist/testkit/enzyme';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function ModalSelectorLayoutWithMandatoryProps() {
  return (
    <ModalSelectorLayout
      dataSource={(_searchQuery, _number, _limit) =>
        Promise.resolve({ items: [], totalCount: 0 })
      }
    />
  );
}

function ModalSelectorLayoutWithAllProps() {
  return (
    <ModalSelectorLayout
      dataSource={(_searchQuery, _number, _limit) =>
        Promise.resolve({ items: [], totalCount: 0 })
      }
      emptyState={<div />}
      title={<div />}
      cancelButtonText="text"
      dataHook="hook"
      deselectAllText="text"
      height="10px"
      imageShape="circle"
      imageSize="cinema"
      itemsPerPage={10}
      maxHeight="15px"
      multiple
      noResultsFoundStateFactory={_searchValue => <div />}
      okButtonText="text"
      onCancel={_ev => {}}
      onClose={_ev => {}}
      onOk={_selectedItems => {}}
      searchDebounceMs={1000}
      searchPlaceholder="placeholder"
      selectAllText="text"
      styles="font: 14px"
      subtitle={<div />}
      withSearch
      disableConfirmation
      onSelect={_item => {}}
      sideActions={<div />}
    />
  );
}

function ShouldSupportMultipleItemsSelection() {
  return (
    <ModalSelectorLayout
      dataSource={(_searchQuery, _number, _limit) =>
        Promise.resolve({ items: [], totalCount: 0 })
      }
      emptyState={<div />}
      multiple
      onOk={(_selectedItems: ModalSelectorLayoutItem[]) => {}}
    />
  );
}

function ShouldSupportSingleSelection() {
  return (
    <ModalSelectorLayout
      dataSource={(_searchQuery, _number, _limit) =>
        Promise.resolve({ items: [], totalCount: 0 })
      }
      emptyState={<div />}
      multiple={false}
      onOk={(_selectedItems: ModalSelectorLayoutItem) => {}}
    />
  );
}

async function testkits() {
  const testkit = modalSelectorLayoutTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = modalSelectorLayoutEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });
}
