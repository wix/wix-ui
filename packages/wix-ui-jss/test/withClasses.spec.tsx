import {sheetMapper} from '../src/domStyleRenderer';
import * as React from 'react';
import {mount} from 'enzyme';
import {withClasses} from '../src/';

type Classes = {classes?: {someClass: string}};

const styles = (theme: any = {}) => ({
  someClass: {
    color: theme.color || 'green'
  }
});

const Component: React.SFC<Classes> = ({classes, children}) => <div className={classes.someClass}>{children}</div>;

const StyledComponent = withClasses(Component, styles);

const render = (Comp: any) => mount(Comp, {attachTo: document.createElement('div')});

const getJssStyleElement = () => {
  const styleElement = document.querySelector('style');
  return styleElement && styleElement.hasAttribute('data-jss') ? styleElement : undefined;
};

describe('withClasses', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('should pass classes prop to the rendered component', () => {
    wrapper = render(<StyledComponent/>);
    expect(wrapper.html()).toBe('<div class="someClass"></div>');
  });

  it('should preserve the component original props', () => {
    wrapper = render(<StyledComponent>Hello</StyledComponent>);
    expect(wrapper.prop('children')).toBe('Hello');
  });

  it('should set an id for the component and map it to the style element in the dom', () => {
    wrapper = render(<StyledComponent/>);
    expect(wrapper.instance().id).toBeDefined();
    expect(sheetMapper[wrapper.first().instance().id].styleElement).toBe(getJssStyleElement());
  });

  it('should inject the correct style tag to the DOM', () => {
    wrapper = render(<StyledComponent/>);
    const element = wrapper.getDOMNode();
    expect(window.getComputedStyle(element).color).toBe('green');
  });

  it('should calculate the style with respect to the theme prop', () => {
    wrapper = render(<StyledComponent theme={{color: 'blue'}}/>);
    const element = wrapper.getDOMNode();
    expect(window.getComputedStyle(element).color).toBe('blue');
  });

  it('should update the style element when the theme changes, and remove the old style element', () => {
    wrapper = render(<StyledComponent theme={{color: 'blue'}}/>);
    const element = wrapper.getDOMNode();
    const styleElementBefore = window.getComputedStyle(element);
    const numberOfDomStyleElements = document.querySelectorAll('style').length;

    wrapper.setProps({theme: {color: 'yellow'}});
    const styleElementAfter = window.getComputedStyle(element);
    const updatedNumberOfDomStyleElements = document.querySelectorAll('style').length;

    expect(numberOfDomStyleElements).toBe(updatedNumberOfDomStyleElements);
    expect(styleElementBefore).not.toBe(styleElementAfter);
    expect(styleElementAfter.color).toBe('yellow');
  });

  it('should not update the style tag when the component re-renders not due to a theme changes', () => {
    wrapper = render(<StyledComponent theme={{color: 'blue'}}/>);
    const element = wrapper.getDOMNode();
    const styleElementBefore = sheetMapper[wrapper.getDOMNode().id];

    wrapper.setProps();
    const styleElementAfter = sheetMapper[wrapper.getDOMNode().id];
    expect(styleElementBefore).toBe(styleElementAfter);
    expect(window.getComputedStyle(element).color).toBe('blue');
  });
});

it('should remove the style tag after component unmounts', () => {
  const wrapper = render(<StyledComponent/>);
  expect(getJssStyleElement()).toBeDefined();
  wrapper.detach();
  expect(getJssStyleElement()).toBeUndefined();
});
