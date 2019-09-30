import React from 'react';

import styles from './{%component-name%}.st.css';

interface Props {
  dataHook: string;

  /** Text for the button */
  buttonText: string;
}

/** {%description%} */
class {%ComponentName%} extends React.PureComponent<Props> {
  static displayName = '{%ComponentName%}';

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
        <span dataHook="{%component-name%}-count">
          You clicked this button {isEven ? 'even' : 'odd'} number (
          <span
            {...styles('number', { even: isEven, odd: !isEven }, this.props)}
          >
            {count}
          </span>
          ) of times
        </span>

        <div className={styles.button}>
          <button
            onClick={this._handleClick}
            dataHook="{%component-name%}-button"
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
}

export default {%ComponentName%};
