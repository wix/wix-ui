/* global describe it expect jest */

import * as React from 'react';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {mount} from 'enzyme';

import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {linkDriverFactory} from './Link.driver';
import {Link} from './Link';

import {linkTestkitFactory} from '../../testkit';
import {linkTestkitFactory as enzymeLinkTestkitFactory} from '../../testkit/enzyme';
import {runTestkitExistsSuite} from '../../common/testkitTests';

describe('Link', () => {
  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(linkDriverFactory);

  it('should be defined', () => {
    const link = createDriver(<Link/>);
    expect(link.exists()).toBe(true);
  });

  it('should render anchor by default', () => {
    const link = createDriver(<Link/>);
    expect(link.isAnchor()).toBe(true);
  });

  describe('`href` prop', () => {
    it('should render `href` attribute', () => {
      const link = createDriver(<Link href="test"/>);
      expect(link.getAttribute('href')).toBe('test');
    });

    it('should not add `href` attribute when prop missing', () => {
      const link = createDriver(<Link/>);
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

  describe('`className` prop', () => {
    it('should be ignored', () => {
      const link = createDriver(<Link className="hello"/>);
      expect(link.getAttribute('class')).not.toBe('hello');
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

      expect(link.getAttribute('target')).toEqual('wix');
      expect(link.getAttribute('data-hook')).toEqual('hooked');

      link.trigger('focus');
      link.trigger('blur');
      link.trigger('keyDown', {keyCode: 13});

      expect(onFocusSpy.mock.calls.length).toEqual(1);
      expect(onBlurSpy.mock.calls.length).toEqual(1);
      expect(onKeyDownSpy.mock.calls[0][0].keyCode).toEqual(13);
    });
  });

  runTestkitExistsSuite({
    Element: <Link/>,
    testkitFactory: linkTestkitFactory,
    enzymeTestkitFactory: enzymeLinkTestkitFactory
  });
});
