import * as React from 'react';
import {createHOC} from './';
import {mount} from 'enzyme';

describe('createHOC function', () => {

  type ComponentProps = {
    id?: string,
    dataClass?: string,
    dataHook?: string
  };

  const render = (Comp: any) => mount(Comp, {attachTo: document.createElement('div')});

  // Regular component with state
  class ChildComponent extends React.Component<ComponentProps, {id: string}> {
    constructor(props) {
      super(props);
      this.boundMethod = this.boundMethod.bind(this);
    }

  state = {id : this.props.id};

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

  describe('Stateful components', () => {
    const HOCComponent = createHOC(ChildComponent);

    it('should render the wrapped component', () => {
      const wrapper = render(<HOCComponent />);
      expect(wrapper.children().instance()).toBeInstanceOf(ChildComponent);
    });

    it('should place data-hook on the root of the component', () => {
      const wrapper = render(<HOCComponent dataHook="my-data-hook" />);
      expect(wrapper.getDOMNode().getAttribute('data-hook')).toBe('my-data-hook');
    });

    it('should place data-class on the root of the component', () => {
      const wrapper = render(<HOCComponent dataClass="my-data-class" />);
      expect(wrapper.getDOMNode().getAttribute('data-class')).toBe('my-data-class');
    });

    describe('hoisting', () => {
      it('should hoist static methods', () => {
        expect(HOCComponent.staticMethod()).toEqual('staticMethod');
      });

      it('should hoist static variables', () => {
        expect(HOCComponent.staticVariable).toEqual('staticVariable');
      });

      it('should hoist prototype methods from child to HOC and bind them', () => {
        const wrapper = render(<HOCComponent id="some_id" />);
        expect((wrapper.instance() as typeof HOCComponent).unboundMethod()).toEqual('unboundMethod');
        expect((wrapper.instance() as typeof HOCComponent).boundMethod()).toEqual('some_id');
      });
    });
  });

  describe('Pure components', () => {
    const HOCComponent = createHOC(PureChildComponent);

    it('should render the wrapped component', () => {
      const wrapper = render(<HOCComponent />);
      expect(wrapper.children().instance()).toBeInstanceOf(PureChildComponent);
    });

    it('should place data-hook on the root of the component', () => {
      const wrapper = render(<HOCComponent dataHook="my-data-hook" />);
      expect(wrapper.getDOMNode().getAttribute('data-hook')).toBe('my-data-hook');
    });

    it('should place data-class on the root of the component', () => {
      const wrapper = render(<HOCComponent dataClass="my-data-class" />);
      expect(wrapper.getDOMNode().getAttribute('data-class')).toBe('my-data-class');
    });

    describe('hoisting', () => {
      it('should hoist static methods', () => {
        expect(HOCComponent.staticMethod()).toEqual('staticMethod');
      });

      it('should hoist static variables', () => {
        expect(HOCComponent.staticVariable).toEqual('staticVariable');
      });

      it('should hoist prototype methods from child to HOC and bind them', () => {
        const wrapper = render(<HOCComponent id="some_id" />);
        expect((wrapper.instance() as typeof HOCComponent).unboundMethod()).toEqual('unboundMethod');
        expect((wrapper.instance() as typeof HOCComponent).boundMethod()).toEqual('some_id');
      });
    });
  });

  describe('Stateless components', () => {
    const StatelessChildComponent = () => (<div>stateless</div>);
    const HOCComponent = createHOC(StatelessChildComponent);

    it('should render the wrapped component', () => {
      const wrapper = render(<HOCComponent />);
      // This doesn't work - it is actually an instance of React.StatelessComponent
      // expect(wrapper.children().instance()).toBeInstanceOf(StatelessChildComponent);
      expect(wrapper.children().length).toEqual(1);
      expect(wrapper.children().contains(<StatelessChildComponent/>)).toBeTruthy();
    });

    it('should place data-hook on the root of the component', () => {
      const wrapper = render(<HOCComponent dataHook="my-data-hook" />);
      expect(wrapper.getDOMNode().getAttribute('data-hook')).toBe('my-data-hook');
    });

    it('should place data-class on the root of the component', () => {
      const wrapper = render(<HOCComponent dataClass="my-data-class" />);
      expect(wrapper.getDOMNode().getAttribute('data-class')).toBe('my-data-class');
    });

    // Nothing to hoist on stateless components
  });

  describe('displayName', () => {
    it('should be inheritted from ChildComponent', () => {
      class Component extends React.Component {
        static displayName = "i'm batman";
        render() {
          return null;
        }
      }

      const HocComponent = createHOC(Component);
      const wrapper = render(<HocComponent/>);
      expect(wrapper.name()).toEqual("i'm batman");
    });

    it('should be className when displayName is undefined', () => {
      class Spiderman extends React.Component {
        render() {
          return null;
        }
      }

      const HocComponent = createHOC(Spiderman);
      const wrapper = render(<HocComponent/>);
      expect(wrapper.name()).toEqual('Spiderman');
    });

    it('should fallback to `WixComponent` when neither displayName nor className available', () => {
      // component as anonymous function
      const HocComponent = createHOC(() => null);
      const wrapper = render(<HocComponent/>)
      expect(wrapper.name()).toEqual('WixComponent');
    });
  });
});
