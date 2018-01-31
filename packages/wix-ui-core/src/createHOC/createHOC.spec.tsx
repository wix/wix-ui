import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createHOC} from './';
import {renderIntoDocument, findRenderedComponentWithType} from 'react-dom/test-utils';
import {mount} from 'enzyme';

describe('createHOC function', () => {

  type ComponentProps = {
    id?: string,
    dataClass?: string,
    dataHook?: string
  };

  // Regular component with state
  class ChildComponent extends React.Component<ComponentProps, {id: string}> {
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
  }

  // Pure component without state
  class PureChildComponent extends React.PureComponent<ComponentProps> {
    id: string;

    constructor(props) {
      super(props);
      this.id = props.id;
      this.boundMethod = this.boundMethod.bind(this);
    }

    static staticVariable = 'staticVariable';
    static staticMethod() { return 'staticMethod'; }
    unboundMethod() { return 'unboundMethod'; }
    boundMethod() { return this.id; }
    render() { return <div>Hello</div>; }
  }

  // Stateless component
  const StatelessChildComponent = () => (<div>stateless</div>);

  describe('Regular components', () => {
    const HOCComponent = createHOC(ChildComponent);

    it('should render the wrapped component', () => {
      const wrapper = renderIntoDocument(<HOCComponent/>);
      expect(findRenderedComponentWithType(wrapper, ChildComponent)).toBeTruthy();
    });

    it('should place data-hook on the root of the component', () => {
      const wrapper = renderIntoDocument(<HOCComponent dataHook="my-data-hook"/>);
      expect(ReactDOM.findDOMNode(wrapper).getAttribute('data-hook')).toBe('my-data-hook');
    });

    it('should place data-class on the root of the component', () => {
      const wrapper = renderIntoDocument(<HOCComponent dataClass="my-data-class"/>);
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
        const wrapper = renderIntoDocument(<HOCComponent id="some_id"/>);
        expect(wrapper.unboundMethod).toBeDefined();
        expect(wrapper.unboundMethod()).toEqual('unboundMethod');
        expect(wrapper.boundMethod).toBeDefined();
        expect(wrapper.boundMethod()).toEqual('some_id');
      });
    });
  });

  describe('Pure components', () => {
    const HOCComponent = createHOC(PureChildComponent);

    it('should render the wrapped component', () => {
      const wrapper = renderIntoDocument(<HOCComponent />);
      expect(findRenderedComponentWithType(wrapper, PureChildComponent)).toBeTruthy();
    });

    it('should place data-hook on the root of the component', () => {
      const wrapper = renderIntoDocument(<HOCComponent dataHook="my-data-hook" />);
      expect(ReactDOM.findDOMNode(wrapper).getAttribute('data-hook')).toBe('my-data-hook');
    });

    it('should place data-class on the root of the component', () => {
      const wrapper = renderIntoDocument(<HOCComponent dataClass="my-data-class" />);
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
        const wrapper = renderIntoDocument(<HOCComponent id="some_id" />);
        expect(wrapper.unboundMethod).toBeDefined();
        expect(wrapper.unboundMethod()).toEqual('unboundMethod');
        expect(wrapper.boundMethod).toBeDefined();
        expect(wrapper.boundMethod()).toEqual('some_id');
      });
    });
  });

  describe('Stateless components', () => {
    const HOCComponent = createHOC(StatelessChildComponent);

    it('should render the wrapped component', () => {
      const wrapper = mount(<HOCComponent />);
      expect(wrapper.containsMatchingElement(<StatelessChildComponent/>)).toBeTruthy();
    });

    it('should place data-hook on the root of the component', () => {
      const wrapper = renderIntoDocument(<HOCComponent dataHook="my-data-hook" />);
      expect(ReactDOM.findDOMNode(wrapper).getAttribute('data-hook')).toBe('my-data-hook');
    });

    it('should place data-class on the root of the component', () => {
      const wrapper = renderIntoDocument(<HOCComponent dataClass="my-data-class" />);
      expect(ReactDOM.findDOMNode(wrapper).getAttribute('data-class')).toBe('my-data-class');
    });

    // Nothing to hoist on stateless components
  });
});
