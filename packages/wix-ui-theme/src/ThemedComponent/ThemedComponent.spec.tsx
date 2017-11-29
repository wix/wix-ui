import * as React from 'react';
import {ThemedComponent} from './';
import {mount} from 'enzyme';
import {expect} from 'chai';

describe('ThemedComponent', () => {
  const themeObject = {color: 'green'};
  const expectedRender = '<div>green</div>';

  it('should pass the calculated theme object to the wrapped component', () => {
    const Component = ({theme}): any => <div>{theme.color}</div>;

    const wrapper = mount(
      <ThemedComponent theme={() => themeObject}>
        <Component/>
      </ThemedComponent>
    );

    expect(wrapper.html()).to.equal(expectedRender);
  });

  it('should keep the original props of the wrapped component', () => {
    const Component = ({theme, anotherProp}): any => <div>{anotherProp}</div>;

    const wrapper = mount(
      <ThemedComponent theme={() => themeObject}>
        <Component anotherProp="Hello"/>
      </ThemedComponent>
    );

    expect(wrapper.html()).to.equal('<div>Hello</div>');
  });

  it('should pass the calculated theme object when the given theme is an object', () => {
    const Component = ({theme}): any => <div>{theme.color}</div>;

    const wrapper = mount(
      <ThemedComponent theme={themeObject}>
        <Component/>
      </ThemedComponent>
    );

    expect(wrapper.html()).to.equal(expectedRender);
  });

  it('should calculate the theme with the additional props that was given to the wrapper', () => {
    const Component = ({theme}): any => <div>{theme.color}</div>;

    const wrapper = mount(
      <ThemedComponent theme={({color}) => ({color})} color="green">
        <Component/>
      </ThemedComponent>
    );

    expect(wrapper.html()).to.equal(expectedRender);
  });

  it('should re-calculate the theme when the additional prop for the wrapper changes', () => {
    const Component = ({theme}): any => <div>{theme.color}</div>;

    const wrapper = mount(
      <ThemedComponent theme={({color}) => ({color})} color="green">
        <Component/>
      </ThemedComponent>
    );

    wrapper.setProps({color: 'red'});
    expect(wrapper.html()).to.equal('<div>red</div>');
  });

  it('should not re-calculate the theme when the component get\'s updated but not due to a theme dependant change', () => {
    const Component = ({theme, x}): any => <div>{x}</div>;

    const wrapper = mount(
      <ThemedComponent theme={({color}) => ({color})} color="green">
        <Component x="green"/>
      </ThemedComponent>
    );

    wrapper.setProps({});
    expect(wrapper.html()).to.equal(expectedRender);
  });
});
