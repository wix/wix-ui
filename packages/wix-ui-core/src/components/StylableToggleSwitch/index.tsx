import * as React from 'react';
import ToggleSwitch from './ToggleSwitch';
import style from './ToggleSwitch.st.css';

// Generic adapter to add the root class and it's css states
export function withStylable(CoreComponent: React.ComponentClass<any>, stylesheet: RuntimeStylesheet, getState: (object) => StateMap) {
  return class StylableComponent extends CoreComponent {
    render() {
      this.props = {...this.props, classes: stylesheet};
      const root = super.render();

      if (!root) {
        return null;
      }

      const className = root.props.className && root.props.className.indexOf(stylesheet.root) === -1 ?
        'root ' + root.props.className :
        root.props.className;

      return React.cloneElement(root, stylesheet(className, getState(this.props), this.props));
    }
  };
}

export const StylableToggleSwitch = withStylable(
  ToggleSwitch,
  style,
  ({checked, disabled}) => ({checked, disabled})
);
