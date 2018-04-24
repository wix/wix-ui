/* global describe it expect */

import * as React from 'react';
// import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
// import {mount} from 'enzyme';

import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {linkDriverFactory} from './Link.driver';
import {Link} from './Link';

// import {linkTestkitFactory} from '../../testkit';
// import {linkTestkitFactory as enzymeLinkFactory} from '../../testkit/enzyme';

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
});
