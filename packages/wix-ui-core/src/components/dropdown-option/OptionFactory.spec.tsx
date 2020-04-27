/* tslint:disable jsx-wrap-multiline */
import * as React from 'react';
import { OptionFactory } from './';
import { Divider } from '../deprecated/divider';
import { classes } from './DropdownOption.st.css';

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
    const option = OptionFactory.create({ id: 5 });
    expect(option.id).toEqual(5);
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.value).toBeNull();
    expect(option.render(option.value)).toBeNull();
  });

  it('should create option with disabled', () => {
    const option = OptionFactory.create({ isDisabled: true });
    expect(option.id).toContain('Option');
    expect(option.isDisabled).toBeTruthy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.value).toBeNull();
    expect(option.render(option.value)).toBeNull();
  });

  it('should create option with selectable false', () => {
    const option = OptionFactory.create({ isSelectable: false });
    expect(option.id).toContain('Option');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.value).toBeNull();
    expect(option.render(option.value)).toBeNull();
  });

  it('should create option with value', () => {
    const option = OptionFactory.create({ value });
    expect(option.id).toContain('Option');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.value).toEqual(value);
    expect(option.render(option.value)).toEqual(value);
  });

  it('should create option with render function', () => {
    const render = () => value;
    const option = OptionFactory.create({ render });
    expect(option.id).toContain('Option');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeTruthy();
    expect(option.value).toBeNull();
    expect(option.render(option.value)).toEqual(value);
  });

  it('should create divider without content', () => {
    const option = OptionFactory.createDivider({ className: 'className' });
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render(value)).toEqual(<Divider className={'className'} />);
  });

  it('should create divider with content', () => {
    const option = OptionFactory.createDivider({ value });
    expect(option.id).toContain('Divider');
    expect(option.isDisabled).toBeFalsy();
    expect(option.isSelectable).toBeFalsy();
    expect(option.render(value)).toEqual(
      <Divider className={undefined}>value</Divider>,
    );
  });

  describe('Highlight', () => {
    it('should create highlighted option', () => {
      const existingOption = OptionFactory.create({ value });
      const option = OptionFactory.createHighlighted(existingOption, 'lu');
      expect(option.id).toContain('Option');
      expect(option.isDisabled).toBeFalsy();
      expect(option.isSelectable).toBeTruthy();
      expect(option.render(value)).toEqual([
        <span className={classes.nonHighlight} key={0}>
          va
        </span>,
        <mark className={classes.highlight} key={1}>
          lu
        </mark>,
        <span className={classes.nonHighlight} key={2}>
          e
        </span>,
      ]);
    });

    it('should support multiple highlight criteria, divided by space', () => {
      const existingOption = OptionFactory.create({
        value: 'This is a sentence',
      });
      const option = OptionFactory.createHighlighted(existingOption, 'his sen');
      expect(option.render(value)).toEqual([
        <span className={classes.nonHighlight} key={0}>
          T
        </span>,
        <mark className={classes.highlight} key={1}>
          his
        </mark>,
        <span className={classes.nonHighlight} key={2}>
          {' is a '}
        </span>,
        <mark className={classes.highlight} key={3}>
          sen
        </mark>,
        <span className={classes.nonHighlight} key={4}>
          tence
        </span>,
      ]);
    });

    it('should handle a case where the beginning of the string is matched', () => {
      const existingOption = OptionFactory.create({ value });
      const option = OptionFactory.createHighlighted(existingOption, 'valu');
      expect(option.id).toContain('Option');
      expect(option.isDisabled).toBeFalsy();
      expect(option.isSelectable).toBeTruthy();
      expect(option.render(value)).toEqual([
        <mark className={classes.highlight} key={0}>
          valu
        </mark>,
        <span className={classes.nonHighlight} key={1}>
          e
        </span>,
      ]);
    });

    it('should handle a value ending with a white space', () => {
      const existingOption = OptionFactory.create({ value });
      const option = OptionFactory.createHighlighted(existingOption, 'va ');
      expect(option.id).toContain('Option');
      expect(option.isDisabled).toBeFalsy();
      expect(option.isSelectable).toBeTruthy();
      expect(option.render(value)).toEqual([
        <mark className={classes.highlight} key={0}>
          va
        </mark>,
        <span className={classes.nonHighlight} key={1}>
          lue
        </span>,
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
});
