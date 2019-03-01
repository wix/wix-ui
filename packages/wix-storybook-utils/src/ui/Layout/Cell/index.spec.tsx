/* global expect describe it */

import React from 'react';
import { shallow } from 'enzyme';

import styles from './styles.scss';
import Cell from './';

describe('Cell', () => {
  describe('`span` prop', () => {
    it('should be set in `gridColumn` style', () => {
      const cell = shallow(<Cell span={4} />);
      expect(cell.prop('style').gridColumn).toEqual('span 4');
    });
  });

  describe('`vertical`', () => {
    it('should set correct classname', () => {
      const cell = shallow(<Cell vertical />);
      expect(cell.prop('className')).toMatch(styles.vertical);
    });
  });
});
