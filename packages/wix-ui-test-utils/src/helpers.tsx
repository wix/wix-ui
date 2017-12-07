import * as React from 'react';

interface ControlledComponentState {
  value: string;
}

interface ControlledComponentProps {
  value?: string;
  onChange?: (e: Event) => void;
  [otherProps: string]: any;
}

export const isClassExists = (element: HTMLElement, className: String): Boolean =>
  !!element && !!element.className.match(new RegExp('\\b' + className + '\\b'));

// HOC that makes underlying component "controlled"
export function makeControlled(Component) {
  return class ControlledComponent extends React.Component<ControlledComponentProps, ControlledComponentState> {
    static displayName = `Controlled${Component.name}`;

    static defaultProps = {
      value: '',
      onChange: () => null
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
