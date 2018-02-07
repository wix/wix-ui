import * as React from 'react';
import {Simulate} from 'react-dom/test-utils';

export interface ControlledComponentState {
  value: string;
}

export interface ControlledComponentProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLElement>) => void;
  [otherProps: string]: any;
}

export interface ControlledEventTarget extends EventTarget {
  value: string;
}

export interface ControlledChangeEvent<T> extends React.ChangeEvent<T> {
  target: ControlledEventTarget & T;
}

export const isClassExists = (element: HTMLElement, className: String): Boolean =>
  !!element && !!element.className.match(new RegExp('\\b' + className + '\\b'));

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// HOC that makes underlying component "controlled"
export function makeControlled<T extends ControlledComponentProps> (Component: React.SFC<T>) {
  return class ControlledComponent extends React.Component<ControlledComponentProps, ControlledComponentState> {
    static defaultProps = {
      value: ''
    };

    state = {value: this.props.value as string};

    _onChange = (e: ControlledChangeEvent<any>) => {
      const {
        onChange
      } = this.props;

      this.setState({
        value: e.target.value
      });

      onChange && onChange(e);
    }

    render() {
      const bindedPropMethods: {[key: string]: any} = {};

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

export const reactEventTrigger = () => Simulate;
