import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import Button from '../Button';
import styles from './{%ComponentName%}.st.css';

/** {%description%} */
class {%ComponentName%} extends React.PureComponent {
  static displayName = '{%ComponentName%}';

  static propTypes = {
    dataHook: PropTypes.string,

    /** Text for the button */
    buttonText: PropTypes.string,
  };

  static defaultProps = {
    buttonText: 'Click me!',
  };

  state = {
    count: 0,
  };

  _handleClick = () => {
    this.setState(({ count }) => ({
      count: count + 1,
    }));
  };

  render() {
    const { count } = this.state;
    const { dataHook, buttonText } = this.props;
    const isEven = count % 2 === 0;

    return (
      <div className={styles.root} data-hook={dataHook}>
        <Text dataHook="{%componentName%}-count">
          You clicked this button {isEven ? 'even' : 'odd'} number (
          <span
            {...styles('number', { even: isEven, odd: !isEven }, this.props)}
          >
            {count}
          </span>
          ) of times
        </Text>

        <div className={styles.button}>
          <Button
            onClick={this._handleClick}
            dataHook="{%componentName%}-button"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }
}

export default {%ComponentName%};
