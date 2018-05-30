import * as React from 'react';
import {inputDriverFactory} from './Input.driver';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {Input} from './';
import {inputTestkitFactory} from '../../testkit';
import {inputTestkitFactory as enzymeInputTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Input', () => {
  const createDriver = createDriverFactory(inputDriverFactory);

  describe('style states', () => {
    it('should support disabled state', () => {
      const input = createDriver(<Input disabled />);
      expect(input.hasStyleState('disabled')).toBe(true);
    });

    it('should support error state', () => {
      const input = createDriver(<Input error />);
      expect(input.hasStyleState('error')).toBe(true);
    });

    it('should support focus state', () => {
      const input = createDriver(<Input />);
      input.focus();
      expect(input.hasStyleState('focus')).toBe(true);
    });
  });

  it('should pass attributes to the native input', () => {
    const input = createDriver(
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

    expect(input.getInput().autocomplete).toBe('on');
    expect(input.getInput().disabled).toBe(true);
    expect(input.getInput().maxLength).toBe(10);
    expect(input.getInput().placeholder).toBe('placeholder');
    expect(input.getInput().readOnly).toBe(true);
    expect(input.getInput().required).toBe(true);
    expect(input.getInput().tabIndex).toBe(1);
    expect(input.getInput().type).toBe('password');
    expect(input.getInput().value).toBe('hunter2');
  });

  describe('prefix and suffix', () => {
    it('should render prefix', () => {
      const input = createDriver(<Input prefix={<div>★</div>} />);
      expect(input.getPrefix().innerHTML).toMatch(/★/);
    });

    it('should render suffix', () => {
      const input = createDriver(<Input suffix={<div>★</div>} />);
      expect(input.getSuffix().innerHTML).toMatch(/★/);
    });
  });

  describe('imperative API', () => {
    let wrapper, inputInstance, inputNode;

    beforeEach(() => {
      wrapper = mount(<Input value="12345" />);
      inputInstance = wrapper.instance() as Input;
      inputNode = wrapper.find('input').getDOMNode() as HTMLInputElement;
      inputNode.blur();
    });

    it('should support focus() method', () => {
      expect(document.activeElement).not.toBe(inputNode);
      inputInstance.focus();
      expect(document.activeElement).toBe(inputNode);
    });

    it('should support blur() method', () => {
      inputInstance.focus();
      expect(document.activeElement).toBe(inputNode);
      inputInstance.blur();
      expect(document.activeElement).not.toBe(inputNode);
    });

    it('should support select() method', () => {
      expect(inputNode.selectionStart).toBe(0);
      expect(inputNode.selectionEnd).toBe(0);
      inputInstance.select();
      expect(inputNode.selectionStart).toBe(0);
      expect(inputNode.selectionEnd).toBe(5);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Input/>, inputTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Input/>, enzymeInputTestkitFactory, mount)).toBe(true);
    });
  });
});
