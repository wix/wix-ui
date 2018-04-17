import * as React from 'react';
import {thumbnailDriverFactory} from './Thumbnail.driver';
import {Thumbnail} from './';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {mount} from 'enzyme';
import {thumbnailTestkitFactory} from '../../testkit';
import {thumbnailTestkitFactory as enzymeThumbnailTestkitFactory} from '../../testkit/enzyme';

describe('Thumbnail', () => {
  const createDriver = createDriverFactory(thumbnailDriverFactory);

  describe('children prop', () => {
    it('should be rendered', () => {
      const driver = createDriver(<Thumbnail><div>hello</div></Thumbnail>);
      expect(driver.getContent().outerHTML).toBe('<div>hello</div>');
    });
  });

  describe('onClick prop', () => {
    it('should be called when clicked', () => {
      const onClick = jest.fn();
      const driver = createDriver(<Thumbnail onClick={onClick}><div/></Thumbnail>);
      driver.click();
      expect(onClick).toBeCalled();
    });
  });

  describe('selected prop', () => {
    it('should not be selected by default', () => {
      const driver = createDriver(<Thumbnail><div/></Thumbnail>);
      expect(driver.isSelected()).toEqual(false);
    });

    it('should be selected', () => {
      const driver = createDriver(<Thumbnail selected><div/></Thumbnail>);
      expect(driver.isSelected()).toEqual(true);
    });
  });

  describe('selectedIcon prop', () => {
    it('should not have icon by default', () => {
      const driver = createDriver(<Thumbnail><div/></Thumbnail>);
      expect(driver.hasSelectedIcon()).toEqual(false);
    });

    it('should not display icon when not selected', () => {
      const driver = createDriver(<Thumbnail selectedIcon="✅"><div/></Thumbnail>);
      expect(driver.hasSelectedIcon()).toEqual(false);
    });

    it('should display icon when selected', () => {
      const driver = createDriver(<Thumbnail selected selectedIcon="✅"><div/></Thumbnail>);
      expect(driver.hasSelectedIcon()).toEqual(true);
    });

    it('should render the given icon when selected', () => {
      const driver = createDriver(<Thumbnail selected selectedIcon={<div>hey</div>}><div/></Thumbnail>);
      expect(driver.getSelectedIcon().outerHTML).toBe(mount(<div>hey</div>).html());
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Thumbnail><div/></Thumbnail>, thumbnailTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Thumbnail><div/></Thumbnail>, enzymeThumbnailTestkitFactory, mount)).toBe(true);
    });
  });
});
