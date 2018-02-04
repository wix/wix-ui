import * as React from 'react';
import {OptionFactory, OptionType} from './';
import {Divider} from '../../components/Divider';
import {Highlighter} from '../Highlighter';

describe('OptionFactory', () => {
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
    expect(option.render()).toEqual(<Divider />);
  });

  it('should create divider with content', () => {
    const option = OptionFactory.createDivider('value');
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render()).toEqual(<Divider>value</Divider>);
  });

  it('should create custom divider', () => {
    const customDivider = () => (<div>CustomDivider</div>);
    const option = OptionFactory.createCustomDivider(customDivider);
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render()).toEqual(<div>CustomDivider</div>);
  });

  it('should create highlighted option', () => {
    const existingOption = OptionFactory.create(1, false, true, 'value');
    const option = OptionFactory.createHighlighted(existingOption, 'lu');
    expect(option.id).toEqual(1);
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.render()).toEqual(<span>va<Highlighter key={1}>lu</Highlighter>e</span>);
  });

  it('should create highlighted option with divider', () => {
    const existingOption = OptionFactory.createDivider();
    const option = OptionFactory.createHighlighted(existingOption, 'lu');
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render()).toEqual(<Divider />);
  });
});
