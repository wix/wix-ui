import * as React from 'react';

export interface ControlledComponentState {
  value: string;
}

export interface ControlledComponentProps {
  value?: string;
  onChange?: (e: Event) => void;
  [otherProps: string]: any;
}

export const isClassExists = (element: HTMLElement, className: String): Boolean =>
  !!element && !!element.className.match(new RegExp('\\b' + className + '\\b'));

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// HOC that makes underlying component "controlled"
export function makeControlled(Component) {
  return class ControlledComponent extends React.Component<ControlledComponentProps, ControlledComponentState> {
    static displayName = `Controlled${Component.name}`;

    static defaultProps = {
      value: ''
    };

    constructor(props) {
      super(props);
      this.state = {value: props.value};
    }

    _onChange = e => {
      const {
        onChange
      } = this.props;

      this.setState({
        value: e.target.value
      });

      onChange && onChange(e);
    }

    render() {
      const bindedPropMethods = {};

      for (const propName of Object.keys(this.props)) {
        const propValue = this.props[propName];

        if (typeof propValue === 'function') {
          bindedPropMethods[propName] = this.props[propName].bind(this);
        }
      }

      return (
        <Component
          {...this.props}
          {...bindedPropMethods}
          value={this.state.value}
          onChange={this._onChange}
        />
      );
    }
  };
}

export const reactEventTrigger = (ReactTestUtils) => {
  const simulate = ReactTestUtils.Simulate;
  return {
    click: (element) => simulate.click(element),
    mousedown: (element) => simulate.mouseDown(element),
    change: (element, handler) => simulate.change(element, handler),
    mouseEnter: (element) => simulate.mouseEnter(element),
    mouseLeave: (element) => simulate.mouseLeave(element),
    focus: (element) => simulate.focus(element),
    blur: (element) => simulate.blur(element),
    keyDown: (element, handler) => simulate.keyDown(element, handler),
    compositionStart: (element) => simulate.compositionStart(element),
    compositionEnd: (element) => simulate.compositionEnd(element),
    trigger: (event, element, handler = () => null) => simulate[event](element, handler)
  };
};
