import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {textLinkDriverFactory} from './TextLink.driver';
import {TextLink} from './TextLink';
import {mount} from 'enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {textLinkTestkitFactory} from '../../testkit';
import {textLinkTestkitFactory as enzymeTextLinkTestkitFactory} from '../../testkit/enzyme';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';

describe('TextLink', () => {
  const createDriver = createDriverFactory(textLinkDriverFactory);

  it('should exist', () => {
    const textLink = createDriver(<TextLink />);
    expect(textLink.exists()).toBeTruthy();
  });

  describe('style states', () => {
    it('should support disabled state', () => {
      const textLink = createDriver(<TextLink disabled />);
      expect(textLink.hasStyleState('disabled')).toBeTruthy();
    });

    it('should support focus state', () => {
      const textLink = createDriver(<TextLink disabled />);
      textLink.focus();
      expect(textLink.hasStyleState('focus')).toBeTruthy();
    });
  });

  it('should pass attributes to the native anchor', () => {
    const textLink = createDriver(
      <TextLink
        target="_blank"
        href="test.com"
      />
    );

    expect(textLink.getElement().href).toBe('test.com');
    expect(textLink.getElement().target).toBe('_blank');
  });

  describe('disabled prop', () => {
    it('should set href to dumb js function when disabled is true', () => {
      const textLink = createDriver(<TextLink href="test.com" disabled/>);
      textLink.click();
      expect(textLink.getHref()).toBe('javascript:void(0);');
    });
  });

  describe('children', () => {
    it('should be rendered', () => {
      const content = 'Click me';
      const textLink = createDriver(<TextLink>{content}</TextLink>);
      expect(textLink.getTextContent()).toBe(content);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<TextLink/>, textLinkTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<TextLink/>, enzymeTextLinkTestkitFactory, mount)).toBe(true);
    });
  });
});
