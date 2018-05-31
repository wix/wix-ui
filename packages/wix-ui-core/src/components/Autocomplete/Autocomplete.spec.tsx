import * as React from 'react';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {autocompleteDriverFactory} from './Autocomplete.driver';
import {Autocomplete} from '.';
import {OptionFactory, DividerArgs} from '../../baseComponents/DropdownOption';
import {generateOptions} from '../../baseComponents/DropdownOption/OptionsExample';
import {autocompleteTestkitFactory} from '../../testkit';
import {autocompleteTestkitFactory as enzymeAutocompleteTestkitFactory} from '../../testkit/enzyme';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {mount} from 'enzyme';

describe('Autocomplete', () => {
  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(autocompleteDriverFactory);

  const options = generateOptions((args: Partial<DividerArgs> = {}) => Autocomplete.createDivider(args.value));

  it('should render autocomplete', () => {
    const driver = createDriver(<Autocomplete options={options} />);
    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });

  it('should initialize autocomplete with value', () => {
    const driver = createDriver(<Autocomplete initialSelectedId={1} options={options} />);
    expect(driver.getValue()).toEqual('value1');
  });

  it('should not filter anything without predicate function', () => {
    const driver = createDriver(<Autocomplete options={options}/>);
    driver.click();
    expect(driver.getOptionsCount()).toBe(options.length);
  });

  ['ArrowUp', 'ArrowDown'].forEach(key => {
    it(`should not filter items according to predicate function when pressing ${key}`, () => {
      const driver = createDriver(<Autocomplete options={options}/>);
      driver.keyDown(key);
      expect(driver.getOptionsCount()).toBe(options.length);
    });
  });

  it('should show all items when focusing even if some text exist', () => {
    const driver = createDriver(<Autocomplete options={options}/>);
    driver.setValue('very');
    driver.click();
    expect(driver.getOptionsCount()).toBe(options.length);
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Autocomplete options={[]}/>, autocompleteTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Autocomplete options={[]}/>, enzymeAutocompleteTestkitFactory, mount)).toBe(true);
    });
  });
});
