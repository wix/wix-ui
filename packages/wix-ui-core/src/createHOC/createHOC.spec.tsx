import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createHOC} from './';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-dom/test-utils'

describe('createHOC function', () => {

  type ComponentProps = {
    id?: string,
    dataClass?: string,
    dataHook?: string
  };

  class ChildComponent extends React.Component<ComponentProps> {
    constructor(props) {
      super(props);
      this.state = {id : props.id};
      this.boundMethod = this.boundMethod.bind(this);
    }

    static staticVariable = 'staticVariable';
    static staticMethod() { return 'staticMethod'; }
    unboundMethod() { return 'unboundMethod'; }
    boundMethod() { return this.state.id; }
    render() { return <div>Hello</div>; }
  };

  const HOCComponent = createHOC(ChildComponent);

  it('should render the wrapped component', () => {
    const wrapper = renderIntoDocument(<HOCComponent/>);
    expect(findRenderedComponentWithType(wrapper, ChildComponent)).toBeTruthy();;
  });

  it('should place data-hook on the root of the component', () => {
    const wrapper = renderIntoDocument(<HOCComponent dataHook='my-data-hook'/>);
    expect(ReactDOM.findDOMNode(wrapper).getAttribute('data-hook')).toBe('my-data-hook');
  });
  
  it('should place data-class on the root of the component', () => {
    const wrapper = renderIntoDocument(<HOCComponent dataClass='my-data-class'/>);
    expect(ReactDOM.findDOMNode(wrapper).getAttribute('data-class')).toBe('my-data-class');
  });

  describe('hoisting', () => {
    it('should hoist static methods', () => {
      expect(HOCComponent.staticMethod).toBeDefined();
      expect(HOCComponent.staticMethod()).toEqual('staticMethod');
    });
    
    it('should hoist static variables', () => {
      expect(HOCComponent.staticVariable).toEqual('staticVariable');
    });
    
    it('should hoist prototype methods from child to HOC and bind them', () => {
      const wrapper = renderIntoDocument(<HOCComponent id='some_id'/>);
      expect(wrapper.unboundMethod).toBeDefined();
      expect(wrapper.unboundMethod()).toEqual('unboundMethod');
      expect(wrapper.boundMethod).toBeDefined();
      expect(wrapper.boundMethod()).toEqual('some_id');
    });
  })
});
