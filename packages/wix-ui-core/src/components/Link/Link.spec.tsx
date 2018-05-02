/* global describe it expect jest */

import * as React from 'react';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {mount} from 'enzyme';

import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {linkDriverFactory} from './Link.driver';
import {Link} from './Link';

import {linkTestkitFactory} from '../../testkit';
import {linkTestkitFactory as enzymeLinkTestkitFactory} from '../../testkit/enzyme';

const createDriver = createDriverFactory(linkDriverFactory);

describe('Link', () => {
  it('should be defined', () => {
    const link = createDriver(<Link/>);
    expect(link.exists()).toBe(true);
  });

  it('should render anchor by default', () => {
    const link = createDriver(<Link/>);
    expect(link.isAnchor()).toBe(true);
  });

  describe('`src` prop', () => {
    it('should render anchor with href from `src`', () => {
      const link = createDriver(<Link src="test"/>);
      expect(link.getSrc()).toBe('test');
    });

    it('should not add `href` when not `src` prop missing', () => {
      const link = createDriver(<Link/>);
      expect(link.getSrc()).toBe(undefined);
      expect(link.getAttribute('href')).toBe(undefined);
    });
  });

  describe('`children` prop', () => {
    it('should be rendered as-is', () => {
      const link = createDriver(<Link>hello!</Link>);
      expect(link.getChildren()).toBe('hello!');
    });

    it('should render span when children is an anchor', () => {
      const link = createDriver(<Link><a>hello</a></Link>);
      expect(link.getChildren()).toBe('<a>hello</a>');
      expect(link.isAnchor()).toBe(false);
    });
  });

  describe('`onClick` prop', () => {
    it('should call given function', () => {
      const spy = jest.fn();
      const link = createDriver(<Link onClick={spy}/>);
      link.trigger('click');
      expect(spy.mock.calls.length).toBe(1);
    });
  });

  describe('other props', () => {
    it('should be passed without modification', () => {
      const onFocusSpy = jest.fn();
      const onBlurSpy = jest.fn();
      const onKeyDownSpy = jest.fn();

      const link = createDriver(
        <Link
          target="wix"
          data-hook="hooked"
          onFocus={onFocusSpy}
          onBlur={onBlurSpy}
          onKeyDown={onKeyDownSpy}
          >
          hello
        </Link>
      );

      expect(link.getAttribute('target').value).toEqual('wix');
      expect(link.getAttribute('data-hook').value).toEqual('hooked');

      link.trigger('focus');
      link.trigger('blur');
      link.trigger('keyDown', {keyCode: 13});

      expect(onFocusSpy.mock.calls.length).toEqual(1);
      expect(onBlurSpy.mock.calls.length).toEqual(1);
      expect(onKeyDownSpy.mock.calls[0][0].keyCode).toEqual(13);
    });
  });

  it('should expose teskit', () => {
    expect(isTestkitExists(<Link/>, linkTestkitFactory)).toBe(true);
  });

  it('should expose enzyme testkit', () => {
    expect(isEnzymeTestkitExists(<Link/>, enzymeLinkTestkitFactory, mount)).toBe(true);
  });
});
