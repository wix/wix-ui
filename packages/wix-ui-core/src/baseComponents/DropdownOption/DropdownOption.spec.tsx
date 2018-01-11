import * as React from 'react';
import {OptionFactory, OptionType} from './';
import Divider from '../../components/Divider';

describe('DropdownOption', () => {
  it('should create default Option', () => {
    const option = OptionFactory.create(1, true, true, 'value');
    expect(option.id).toEqual(1);
    expect(option.isDisabled).toBeTruthy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.render()).toEqual(<span>value</span>);
  });

  it('should create simple Option', () => {
    const option = OptionFactory.create(1, true, true, 'value', OptionType.Simple);
    expect(option.id).toEqual(1);
    expect(option.isDisabled).toBeTruthy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.render()).toEqual(<span>value</span>);
  });

  it('should create divider without content', () => {
    const option = OptionFactory.createDivider();
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render()).toEqual(<Divider>{null}</Divider>);
  });

  it('should create divider with content', () => {
    const option = OptionFactory.createDivider('value');
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render()).toEqual(<Divider>value</Divider>);
  });
});
