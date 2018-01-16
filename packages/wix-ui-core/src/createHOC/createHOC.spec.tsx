import * as React from 'react';
import {createHOC} from './';
import {mount} from 'enzyme';

describe('createHOC function', () => {

  type ComponentProps = {
    children?: any,
    dataClass?: string,
    dataHook?: string
  };

  const Component: React.SFC<ComponentProps> = ({children}) => React.createElement('div', {children});

  const HOCComponent = createHOC(Component);

  const render = (Comp: any) => mount(Comp, {attachTo: document.createElement('div')});

  let wrapper;

  afterEach(() => wrapper.detach());

  it('should render the wrapped component', () => {
    wrapper = render(<HOCComponent>Hello</HOCComponent>);
    expect(wrapper.html()).toBe('<div>Hello</div>');
  });

  it('should place data-hook on the root of the component', () => {
    wrapper = render(<HOCComponent dataHook="my-data">Hello</HOCComponent>);
    expect(wrapper.getDOMNode().getAttribute('data-hook')).toBe('my-data');
  });

  it('should place data-class on the root of the component', () => {
    wrapper = render(<HOCComponent dataClass="my-data">Hello</HOCComponent>);
    expect(wrapper.getDOMNode().getAttribute('data-class')).toBe('my-data');
  });
});
