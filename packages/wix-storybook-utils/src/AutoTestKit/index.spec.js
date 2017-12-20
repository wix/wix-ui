import React from 'react';
import {mount} from 'enzyme';
import fs from 'fs';
import path from 'path';
import {DriverParser} from './DriverParser';
import BadgeDriverJson from './Badge.driver';

import AutoTestKit from './index';

const fakeTestKitsPaths = {
  InputWithOptions: 'mock-testkits/InputWithOptions.driver.txt',
  IconWithOptions: 'mock-testkits/IconWithOptions.driver.txt',
  LanguagePicker: 'mock-testkits/LanguagePicker.driver.txt',
  Input: 'mock-testkits/Input.driver.txt',
  DropdownLayout: 'mock-testkits/DropdownLayout.driver.txt',
  Badge: 'mock-testkits/Badge.driver.txt',
  TextLink: 'mock-testkits/textLink.driver.txt'
};

const getFakeTestKitFile = fileName =>
  fs.readFileSync(path.resolve(path.join(__dirname, fileName)), 'utf8');

const getFiles = () => ({
  '../InputWithOptions/InputWithOptions.driver': getFakeTestKitFile(fakeTestKitsPaths.InputWithOptions),
  './Input.driver': getFakeTestKitFile(fakeTestKitsPaths.Input),
  '../DropdownLayout/DropdownLayout.driver': getFakeTestKitFile(fakeTestKitsPaths.DropdownLayout)
});

const parseTestKit = testKit => {
  const entryTestKitFile = getFakeTestKitFile(testKit);
  const files = {
    entry: testKit,
    origin: testKit,
    ...getFiles,
    [testKit]: entryTestKitFile
  };
  return new DriverParser(files).parse();
};

const render = testKit => {
  return mount(<AutoTestKit source={parseTestKit(testKit)}/>);
};

const byHook = (wrapper, hook) =>
  wrapper.find(`[data-hook="${hook}"]`);

const createDriver = wrapper => {
  return {
    getMethodsCount: () => byHook(wrapper, 'method').length,
    getMethodAt: index => {
      const method = byHook(wrapper, 'method').at(index);
      return {
        getName: () => byHook(method, 'name').text(),
        getDescription: () => byHook(method, 'description').text(),
        getOrigin: () => byHook(method, 'origin').text()
      };
    }
  };
};

describe('AutoTestKit', () => {

  describe('Badge testKit', () => {
    it('should have seven methods', () => {
      const driver = createDriver(render(fakeTestKitsPaths.Badge));
      expect(driver.getMethodsCount()).toEqual(7);
      expect(driver.getMethodAt(0).getDescription()).toEqual(' Something  Something ');
    });
  });

  describe('Input testKit', () => {
    it('should have fifty methods', () => {
      const driver = createDriver(render(fakeTestKitsPaths.Input));
      expect(driver.getMethodsCount()).toEqual(50);
      expect(driver.getMethodAt(2).getName()).toEqual('blur');
    });
  });

  describe('IconWithOptions testKit', () => {
    it('should have seven nested methods', () => {
      const driver = createDriver(render(fakeTestKitsPaths.IconWithOptions));
      expect(driver.getMethodsCount()).toEqual(7);
      expect(driver.getMethodAt(2).getName()).toEqual('driver.mouseLeave');
      expect(driver.getMethodAt(6).getName()).toEqual('dropdownLayoutDriver.isDropDirectionUp');
    });

    it('should have proper origin', () => {
      const parseIconWithOptionsTestKit = () => {
        const files = {
          entry: fakeTestKitsPaths.IconWithOptions,
          origin: fakeTestKitsPaths.LanguagePicker,
          ...getFiles,
          [fakeTestKitsPaths.IconWithOptions]: getFakeTestKitFile(fakeTestKitsPaths.IconWithOptions)
        };
        return new DriverParser(files).parse();
      };

      const render = () => {
        return mount(<AutoTestKit source={parseIconWithOptionsTestKit()}/>);
      };

      const driver = createDriver(render(fakeTestKitsPaths.IconWithOptions));
      expect(driver.getMethodAt(2).getOrigin()).toEqual('IconWithOptions.driver.txt');
    });
  });

  describe('parsing', () => {
    it('should return json', () => {
      expect(parseTestKit(fakeTestKitsPaths.Badge)).toEqual(BadgeDriverJson);
    });
  });
});


