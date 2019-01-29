import React from 'react';
import PropTypes from 'prop-types';

const enabledStyle = {
  fontSize: 20,
};

const disabledStyle = {
  fontSize: 12,
  color: 'grey',
};

/** Description from source! */
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSetOnMounting: this.props.valueSetOnMounting,
    };
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
  number: PropTypes.number,
  valueSetOnMounting: PropTypes.number,
  children: PropTypes.node,
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  propNotVisibleInStorybook: PropTypes.bool,
};

Component.defaultProps = {
  children: 'Hello dummy component!',
  enabled: true,
  onClick: () => 'you clicked!',
};

Component.displayName = 'DummyComponent';

export default Component;
