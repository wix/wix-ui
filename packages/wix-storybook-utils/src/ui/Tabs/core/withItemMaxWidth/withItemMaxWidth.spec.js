import React from 'react';
import {stub} from 'sinon';
import {mount} from 'enzyme';

import * as Utils from '../utils';
import withItemMaxWidth from './index';


describe('withItemMaxWidth hoc', () => {

  stub(Utils, 'getWidth');

  afterEach(() => {
    Utils.getWidth.reset();
    Utils.getWidth.resetBehavior();
  });

  afterAll(() => {
    Utils.getWidth.restore();
  });

  const Component = () => <div/>; // eslint-disable-line react/prop-types
  const aComponent = (props = {}) => mount(React.createElement(withItemMaxWidth(Component), props));
  const anItem = (id, title = 'Any') => ({id, title});

  it('sets itemMaxWidth for compactSide type', () => {
    const items = [anItem(0), anItem(1)];
    const containerSize = 100;
    Utils.getWidth.returns(containerSize);

    const comp = aComponent({items, type: 'compactSide'});

    const actualWidth = comp.find(Component).prop('itemMaxWidth');
    const expectedWidth = (containerSize / items.length) - (18 * (items.length - 1));

    expect(actualWidth).toEqual(expectedWidth);
  });

  it('does not set itemMaxWidth for other types', () => {
    const comp = aComponent({items: [anItem('a'), anItem('b')], type: 'uniformFull'});
    expect(comp.find(Component).prop('itemMaxWidth')).toBe(undefined);
  });

  it('passes props to the wrapped component', () => {
    const props = {a: '1', b: true, c: 3};
    const comp = aComponent({items: [anItem(0)], ...props});
    expect(comp.find(Component).props()).toMatchObject(props);
  });

});
