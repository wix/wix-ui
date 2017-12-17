import * as React from 'react';
import {mount} from 'enzyme';
import {withClasses} from '../src/';
import {DomTestkit} from '../testkit/domTestkit';

type Classes = {classes: {someClass: string}};

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

  it('should set an id for the componet and map it to the style element in the dom', () => {
    wrapper = render(<StyledComponent/>);
    const domTestkit = new DomTestkit({componentId: wrapper.node.id});

    expect(wrapper.node.id).toBeDefined();
    expect(domTestkit.getStyleElementByComponentId(wrapper.node.id)).toBe(getJssStyleElement());
  });

  it('should inject the correct style tag to the DOM', () => {
    wrapper = render(<StyledComponent/>);
    const domTestkit = new DomTestkit({componentId: wrapper.node.id});
    expect(domTestkit.getCssValue({className: 'someClass', property: 'color'})).toBe('green');
  });

  it('should calculate the style with respect to the theme prop', () => {
    wrapper = render(<StyledComponent theme={{color: 'blue'}}/>);
    const domTestkit = new DomTestkit({componentId: wrapper.node.id});
    expect(domTestkit.getCssValue({className: 'someClass', property: 'color'})).toBe('blue');
  });

  it('should update the style element when the theme changes, and remove the old style element', () => {
    wrapper = render(<StyledComponent theme={{color: 'blue'}}/>);
    const domTestkit = new DomTestkit({componentId: wrapper.node.id});
    const styleElementBefore = domTestkit.getStyleElementByComponentId(wrapper.node.id);
    const numberOfDomStyleElements = document.querySelectorAll('style').length;

    wrapper.setProps({theme: {color: 'yellow'}});
    const styleElementAfter = domTestkit.getStyleElementByComponentId(wrapper.node.id);
    const updatedNumberOfDomStyleElements = document.querySelectorAll('style').length;

    expect(numberOfDomStyleElements).toBe(updatedNumberOfDomStyleElements);
    expect(styleElementBefore).not.toBe(styleElementAfter);
    expect(domTestkit.getCssValue({className: 'someClass', property: 'color'})).toBe('yellow');
  });

  it('should not update the style tag when the component re-renders not due to a theme changes', () => {
    wrapper = render(<StyledComponent theme={{color: 'blue'}}/>);
    const domTestkit = new DomTestkit({componentId: wrapper.node.id});
    const styleElementBefore = domTestkit.getStyleElementByComponentId(wrapper.node.id);

    wrapper.setProps();
    const styleElementAfter = domTestkit.getStyleElementByComponentId(wrapper.node.id);
    expect(styleElementBefore).toBe(styleElementAfter);
    expect(domTestkit.getCssValue({className: 'someClass', property: 'color'})).toBe('blue');
  });
});

it('should remove the style tag after component unmounts', () => {
  const wrapper = render(<StyledComponent/>);
  expect(getJssStyleElement()).toBeDefined();
  wrapper.detach();
  expect(getJssStyleElement()).toBeUndefined();
});
