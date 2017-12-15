import React from 'react';
import {mount} from 'enzyme';
import fs from 'fs';
import path from 'path';

import AutoTestKit from './AutoTestKit';

const fakeBadgeTestKitFilePath = 'mock-testkits/BadgeDriverString.txt';
const fakeInputTestKitFilePath = 'mock-testkits/InputDriverString.txt';
const fakeTextLinkTestKitFilePath = 'mock-testkits/textLinkDriverString.txt';

const getFakeTestKitFile = fileName =>
  fs.readFileSync(path.resolve(path.join(__dirname, fileName)), 'utf8');

const render = testKit =>
  mount(<AutoTestKit source={testKit}/>);

const byHook = (wrapper, hook) =>
  wrapper.find(`[data-hook="${hook}"]`);

const createDriver = wrapper => {
  return {
    getMethodsCount: () => byHook(wrapper, 'method').length,
    getMethodAt: index => {
      const method = byHook(wrapper, 'method').at(index);
      return {
        getName: () => byHook(method, 'name').text(),
        getDescription: () => byHook(method, 'description').text()
      };
    }
  };
};

describe('AutoTestKit', () => {

  describe('Badge testKit', () => {
    it('should have seven methods', () => {
      const badgeTestKit = getFakeTestKitFile(fakeBadgeTestKitFilePath);
      const driver = createDriver(render(badgeTestKit));
      expect(driver.getMethodsCount()).toEqual(7);
      expect(driver.getMethodAt(0).getDescription()).toEqual(' Something  Something ');
    });
  });

  describe('Input testKit', () => {
    it('should have fifty methods', () => {
      const inputTestKit = getFakeTestKitFile(fakeInputTestKitFilePath);
      const driver = createDriver(render(inputTestKit));
      expect(driver.getMethodsCount()).toEqual(50);
      expect(driver.getMethodAt(2).getName()).toEqual('blur');
    });
  });

  describe('TextLink testKit', () => {
    it('should render', () => {
      const textLinkTestKit = getFakeTestKitFile(fakeTextLinkTestKitFilePath);
      const driver = createDriver(render(textLinkTestKit));
    });
  });
});

