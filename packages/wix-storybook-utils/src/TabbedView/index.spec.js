/* global expect describe it */

import React from 'react';
import { mount } from 'enzyme';

import TabbedView from '.';

const getTabbedViewDriver = () => {
  let wrapper;
  return {
    mount: (activeTabId, tabs) => {
      wrapper = mount(
        <TabbedView showTabs activeTabId={activeTabId} tabs={tabs}>
          {tabs.map((tab, i) => (
            <div key={i} data-hook={`child-${tab}`} />
          ))}
        </TabbedView>,
      );
    },
    getChildById: tabId => wrapper.find(`[data-hook="child-${tabId}"]`),
    clickOnTab: tabId =>
      wrapper.find(`[data-hook="${tabId}"]`).simulate('click'),
    cleanup: () => wrapper.unmount(),
  };
};

describe('TabbedView', () => {
  let driver;
  afterEach(() => driver.cleanup());
  it('should show correct children based on activeTabId', () => {
    const firstTabId = 'tab1';
    const activeTabId = 'tab2';
    const tabs = [firstTabId, activeTabId];
    driver = getTabbedViewDriver();
    driver.mount(activeTabId, tabs);
    expect(driver.getChildById(firstTabId).exists()).toBe(false);
    expect(driver.getChildById(activeTabId).exists()).toBe(true);
  });

  it('should be case insensitive for activeTabId', () => {
    const firstTabId = 'tab1';
    const activeTabId = 'tab2';
    const tabs = [firstTabId, activeTabId];
    driver = getTabbedViewDriver();
    driver.mount(activeTabId.toUpperCase(), tabs);
    expect(driver.getChildById(firstTabId).exists()).toBe(false);
    expect(driver.getChildById(activeTabId).exists()).toBe(true);
  });

  it('should be get active tab from query param', () => {
    const firstTabId = 'tab1';
    const activeTabId = 'tab2';
    jest.spyOn(window.parent, 'location', 'get').mockImplementation(() => {
      return {
        search: `?activeTab=${activeTabId}`,
      };
    });
    const tabs = [firstTabId, activeTabId];
    driver = getTabbedViewDriver();
    driver.mount(null, tabs);
    expect(driver.getChildById(firstTabId).exists()).toBe(false);
    expect(driver.getChildById(activeTabId).exists()).toBe(true);
  });

  it('should set active tab in query string', () => {
    const firstTabId = 'tab1';
    const secondTabId = 'tab2';
    jest.spyOn(window.parent, 'location', 'get').mockImplementation(() => {
      return {
        search: `?activeTab=${secondTabId}`,
      };
    });
    const spy = jest.spyOn(window.parent.history, 'pushState');
    const tabs = [firstTabId, secondTabId];
    driver = getTabbedViewDriver();
    driver.mount(null, tabs);
    driver.clickOnTab(firstTabId);
    expect(spy).toHaveBeenCalledWith(
      { id: firstTabId },
      '',
      expect.stringContaining(`activeTab=${firstTabId}`),
    );
  });
});
