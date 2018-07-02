/* global describe it expect */

import * as React from 'react';
import {Simulate} from 'react-dom/test-utils';
import {StylableDOMUtil} from 'stylable/test-utils';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {Input} from './Input';
import {InputDriver} from './Input.private.driver';
import style from './Input.st.css';

const stylableUtil = new StylableDOMUtil(style);

describe('Input', () => {
  const container = new ReactDOMTestContainer().unmountAfterEachTest();
  const render = jsx =>
    container.renderWithRef(jsx)
    .then(ref => new InputDriver(container.componentNode, ref));

  describe('Style states', () => {
    it('should support disabled state', async () => {
      const input = await render(<Input disabled />);
      expect(stylableUtil.hasStyleState(input.root, 'disabled')).toBe(true);
    });

    it('should support error state', async () => {
      const input = await render(<Input error />);
      expect(stylableUtil.hasStyleState(input.root, 'error')).toBe(true);
    });

    it('should support focus state', async () => {
      const input = await render(<Input />);
      Simulate.focus(input.input);
      expect(stylableUtil.hasStyleState(input.root, 'focus')).toBe(true);
    });
  });

  it('should pass attributes to the native input', async () => {
    const {input} = await render(
      <Input
        autoComplete="on"
        disabled
        maxLength={10}
        placeholder="placeholder"
        readOnly
        required
        tabIndex={1}
        type="password"
        value="hunter2"
      />
    );

    expect(input.autocomplete).toBe('on');
    expect(input.disabled).toBe(true);
    expect(input.maxLength).toBe(10);
    expect(input.placeholder).toBe('placeholder');
    expect(input.readOnly).toBe(true);
    expect(input.required).toBe(true);
    expect(input.tabIndex).toBe(1);
    expect(input.type).toBe('password');
    expect(input.value).toBe('hunter2');
  });

  it('should render prefix and suffix', async () => {
    const input = await render(
      <Input prefix={<div>PREFIX</div>} suffix={<div>SUFFIX</div>} />
    );

    expect(input.prefix.textContent).toBe('PREFIX');
    expect(input.suffix.textContent).toBe('SUFFIX');
  });

  describe('Imperative API', () => {
    it('should support focus() and blur() methods', async () => {
      const {input, instance} = await render(<Input />);

      expect(document.activeElement).not.toBe(input);
      instance.focus();
      expect(document.activeElement).toBe(input);
      instance.blur();
      expect(document.activeElement).not.toBe(input);
    });

    it('should support select() method', async () => {
      const {input, instance} = await render(<Input value="123" />);

      expect(input.selectionStart).toBe(input.selectionEnd);
      instance.select();
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(3);
    });
  });

  describe('`style` prop', () => {
    it('should set inline style on input', async () => {
      const styles = {
        width: '100px',
        background: 'blue',
        color: 'green',
        display: 'inline-flex'
      };
      const driver = await render(<Input style={styles}/>);
      expect(driver.root.style).toEqual(expect.objectContaining(styles));
    });
  });
});
