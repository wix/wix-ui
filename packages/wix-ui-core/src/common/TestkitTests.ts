import {mount} from 'enzyme';
import {
  isEnzymeTestkitExists,
  WrapperData,
  isTestkitExists,
  BaseDriver
} from 'wix-ui-test-utils';

export interface TestkitSuiteParams<T extends BaseDriver> {
  Element: React.ReactElement<any>;
  testkitFactory: (obj: {wrapper: any; dataHook: string; }) => T;
  enzymeTestkitFactory: (obj: WrapperData) => T;
}

export function runTestkitExistsSuite<T extends BaseDriver>(params: TestkitSuiteParams<T>) {

  describe('testkits', () => {
    describe('vanilla', () => {
      it('should exist', () => {
        expect(isTestkitExists(params.Element, params.testkitFactory, {dataHookPropName: 'data-hook'})).toBe(true);
      });
    });

    describe('enzyme', () => {
      it('should exist', () => {
        expect(isEnzymeTestkitExists(params.Element, params.enzymeTestkitFactory, mount, {dataHookPropName: 'data-hook'})).toBe(true);
      });
    });
  });
}
