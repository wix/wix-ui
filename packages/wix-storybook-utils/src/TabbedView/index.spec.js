/* global expect describe it */

import React from 'react';
import { mount } from 'enzyme';

import TabbedView from '.';
import { DriverDocumentation } from '../AutoTestkit/driver-documentation';

const getTabbedViewDriver = () => {
  let wrapper;
  return {
    mount: (activeTabId, tabs) => {
      wrapper = mount(
        <TabbedView activeTabId={activeTabId} tabs={tabs}>
          {tabs.map((tab, i) => (
            <div key={i} data-hook={tab} />
          ))}
        </TabbedView>,
      );
    },
    getTabById: tabId => wrapper.find(`[data-hook="${tabId}"]`),
    cleanup: () => wrapper.unmount()
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
    expect(driver.getTabById(firstTabId).exists()).toBe(false);
    expect(driver.getTabById(activeTabId).exists()).toBe(true);
  });

  it('should be case insensitive for activeTabId', () => {
    const firstTabId = 'tab1';
    const activeTabId = 'tab2';
    const tabs = [firstTabId, activeTabId];
    driver = getTabbedViewDriver();
    driver.mount(activeTabId.toUpperCase(), tabs);
    expect(driver.getTabById(firstTabId).exists()).toBe(false);
    expect(driver.getTabById(activeTabId).exists()).toBe(true);
  });

  it('should be get active tab from query param', () => {
    const firstTabId = 'tab1';
    const activeTabId = 'tab2';
    jest.spyOn(window.parent, 'location', 'get').mockImplementation(() => {
      return {
        search: `?activeTab=${activeTabId}`
      };
    });
    const tabs = [firstTabId, activeTabId];
    driver = getTabbedViewDriver();
    driver.mount(null, tabs);
    expect(driver.getTabById(firstTabId).exists()).toBe(false);
    expect(driver.getTabById(activeTabId).exists()).toBe(true);
  });
});
