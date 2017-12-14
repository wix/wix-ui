import React from 'react';
import {mount} from 'enzyme';
import fs from 'fs';
import path from 'path';
import DriverParser from './DriverParser';
import ParsedBadgeTestKitJSON from './parsedBadgeTestKit';
import AutoTestKit from './AutoTestKit';

const fakeBadgeTestKitFileName = 'BadgeDriverString.txt';
const fakeInputTestKitFileName = 'InputDriverString.txt';

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

  describe('badge testKit', () => {
    it('should return exactly the object is expected', () => {
      const BadgeTestKit = getFakeTestKitFile(fakeBadgeTestKitFileName);
      const result = new DriverParser(BadgeTestKit).parse();

      expect(result).toEqual(ParsedBadgeTestKitJSON);
    });
  });

  describe('badge testKit', () => {
    it('should have seven methods', () => {
      const BadgeTestKit = getFakeTestKitFile(fakeBadgeTestKitFileName);
      const driver = createDriver(render(BadgeTestKit));
      expect(driver.getMethodsCount()).toEqual(7);
      expect(driver.getMethodAt(0).getDescription()).toEqual(' Something  Something ');
    });
  });

  describe('input testKit', () => {
    it('should have fifty methods', () => {
      const InputTestKit = getFakeTestKitFile(fakeInputTestKitFileName);
      const driver = createDriver(render(InputTestKit));
      expect(driver.getMethodsCount()).toEqual(50);
      expect(driver.getMethodAt(2).getName()).toEqual('blur');
    });
  });
});

