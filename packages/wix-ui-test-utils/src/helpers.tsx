import * as React from 'react';
import {Simulate, SyntheticEventData} from 'react-dom/test-utils';
import { EventSimulator } from './index';

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

    state = {value: this.props.value as string};

    _onChange = (e) => {
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

// interface EventTrigger {
//   trigger: (event: string, element: Element, handler?: SyntheticEventData) => void;
//   [key: string]: Partial<EventSimulator>;
// }

// export const reactEventTrigger: () => EventTrigger = () => {
//   const simulate = Simulate;
//   return {
//     click: (element: Element) => simulate.click(element),
//     doubleClick: (element: Element) => simulate.doubleClick(element),
//     mousedown: (element: Element) => simulate.mouseDown(element),
//     change: (element: Element, handler: SyntheticEventData) => simulate.change(element, handler),
//     mouseEnter: (element: Element) => simulate.mouseEnter(element),
//     mouseLeave: (element: Element) => simulate.mouseLeave(element),
//     focus: (element: Element) => simulate.focus(element),
//     blur: (element: Element) => simulate.blur(element),
//     keyUp: (element: Element, handler: SyntheticEventData) => simulate.keyUp(element, handler),
//     keyDown: (element: Element, handler: SyntheticEventData) => simulate.keyDown(element, handler),
//     compositionStart: (element: Element) => simulate.compositionStart(element),
//     compositionEnd: (element: Element) => simulate.compositionEnd(element),
//     trigger: (event, element: Element, handler = () => null) => simulate[event](element, handler)
//   } ;
// };
