import * as React from 'react';
import {OptionFactory} from './';
import {Divider} from '../../components/deprecated/divider';
import style from './DropdownOption.st.css';

describe('OptionFactory', () => {
  const value = 'value';

  it('should create default option', () => {
    const option = OptionFactory.create();
    expect(option.id).toContain('Option');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.value).toBeNull();
    expect(option.render(option.value)).toBeNull();
  });

  it('should create option with id', () => {
    const option = OptionFactory.create({id: 5});
    expect(option.id).toEqual(5);
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.value).toBeNull();
    expect(option.render(option.value)).toBeNull();
  });

  it('should create option with disabled', () => {
    const option = OptionFactory.create({isDisabled: true});
    expect(option.id).toContain('Option');
    expect(option.isDisabled).toBeTruthy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.value).toBeNull();
    expect(option.render(option.value)).toBeNull();
  });

  it('should create option with selectable false', () => {
    const option = OptionFactory.create({isSelectable: false});
    expect(option.id).toContain('Option');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.value).toBeNull();
    expect(option.render(option.value)).toBeNull();
  });

  it('should create option with value', () => {
    const option = OptionFactory.create({value});
    expect(option.id).toContain('Option');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.value).toEqual(value);
    expect(option.render(option.value)).toEqual(value);
  });

  it('should create option with render function', () => {
    const render = () => value;
    const option = OptionFactory.create({render});
    expect(option.id).toContain('Option');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.value).toBeNull();
    expect(option.render(option.value)).toEqual(value);
  });

  it('should create divider without content', () => {
    const option = OptionFactory.createDivider({className: 'className'});
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render(value)).toEqual(<Divider className={'className'} />);
  });

  it('should create divider with content', () => {
    const option = OptionFactory.createDivider({value});
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render(value)).toEqual(<Divider className={undefined}>value</Divider>);
  });

  it('should create highlighted option', () => {
    const existingOption = OptionFactory.create({value});
    const option = OptionFactory.createHighlighted(existingOption, 'lu');
    expect(option.id).toContain('Option');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.render(value)).toEqual([
      <span className={style.nonHighlight} key={0}>va</span>,
      <mark className={style.highlight} key={1}>lu</mark>,
      <span className={style.nonHighlight} key={2}>e</span>
    ]);
  });

  it('should create highlighted option with divider', () => {
    const existingOption = OptionFactory.createDivider();
    const option = OptionFactory.createHighlighted(existingOption, 'lu');
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render(value)).toEqual(<Divider className={undefined} />);
  });
});
