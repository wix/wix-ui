import * as React from 'react';
import {OptionFactory} from './';
import {Divider} from '../../components/Divider';
import {Highlighter} from '../Highlighter';

describe('OptionFactory', () => {
  const value = 'value';
  it('should create default Option', () => {
    const option = OptionFactory.create(1, true, true, value);
    expect(option.id).toEqual(1);
    expect(option.isDisabled).toBeTruthy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.render(value)).toEqual(value);
  });

  it('should create simple Option', () => {
    const option = OptionFactory.create(1, true, true, value);
    expect(option.id).toEqual(1);
    expect(option.isDisabled).toBeTruthy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.render(value)).toEqual(value);
  });

  it('should create divider without content', () => {
    const option = OptionFactory.createDivider();
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render(value)).toEqual(<Divider />);
  });

  it('should create divider with content', () => {
    const option = OptionFactory.createDivider(value);
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render(value)).toEqual(<Divider>value</Divider>);
  });

  it('should create custom divider', () => {
    const CustomDivider = () => (<div>CustomDivider</div>);
    const option = OptionFactory.createCustomDivider(<CustomDivider />);
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render(value)).toEqual(<CustomDivider />);
  });

  it('should create highlighted option', () => {
    const existingOption = OptionFactory.create(1, false, true, value);
    const option = OptionFactory.createHighlighted(existingOption, 'lu');
    expect(option.id).toEqual(1);
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.render(value)).toEqual(['va', <Highlighter key={1}>lu</Highlighter>, 'e']);
  });

  it('should create highlighted option with divider', () => {
    const existingOption = OptionFactory.createDivider();
    const option = OptionFactory.createHighlighted(existingOption, 'lu');
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render(value)).toEqual(<Divider />);
  });
});
