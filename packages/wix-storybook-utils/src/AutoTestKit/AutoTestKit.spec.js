import React from 'react';
import {mount} from 'enzyme';
import fs from 'fs';
import path from 'path';
import {DriverParser} from './DriverParser';

import AutoTestKit from './AutoTestKit';

const fakeTestKitsPaths = {
  InputWithOptions: 'mock-testkits/InputWithOptions.driver.txt',
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

const render = testKit => {
  const entryTestKitFile = getFakeTestKitFile(testKit);
  const files = {
    entry: testKit,
    ...getFiles,
    [testKit]: entryTestKitFile
  };
  const source = new DriverParser(files).parse();
  return mount(<AutoTestKit source={source}/>);
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
        getDescription: () => byHook(method, 'description').text()
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
});


