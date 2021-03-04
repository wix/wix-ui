import React from 'react';
import PropTypes from 'prop-types';

const enabledStyle = {
  fontSize: 20,
};

const disabledStyle = {
  fontSize: 12,
  color: 'grey',
};

/** Component Description from source! */
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSetOnMounting: this.props.valueSetOnMounting,
    };
  }

  _privateMethod() {}

  /** this is a public method */
  publicMethod(property) {
    return property;
  }

  render() {
    const { enabled, children, onClick, number } = this.props;
    return (
      <div style={enabled ? enabledStyle : disabledStyle} onClick={onClick}>
        {children}
        <br />
        the number is {number}
        <br />
        and it's type is {typeof number}
        <br />
        this value is set only when mounted or remount:{' '}
        {this.state.valueSetOnMounting}
      </div>
    );
  }
}

Component.propTypes = {
  /** used to associate a control with the regions that it controls. */
  number: PropTypes.number,
  /** Used to associate a region with its descriptions, similar to aria-controls but instead associating descriptions to the region and description identifiers are separated with a space. */
  valueSetOnMounting: PropTypes.number,
  /** Used to define a string that labels the current element in case where a text label is not visible on the screen. */
  children: PropTypes.node,
  /** Sets value of native autocomplete attribute (consult the HTML spec for possible value */
  enabled: PropTypes.bool.isRequired,
  /** Standard React Input autoFocus (focus the element on mount) */
  onClick: PropTypes.func,
  /** do not use this prop
   * @deprecated since forever*/
  propNotVisibleInStorybook: PropTypes.bool,
  undefinedValueProp: PropTypes.string,
  listOfStrings: PropTypes.oneOf(['', 'one', 'two', 'three']),
};

Component.defaultProps = {
  children: 'Hello dummy component!',
  enabled: true,
  onClick: () => 'you clicked!',
};

Component.displayName = 'Component';

export default Component;
