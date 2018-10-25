import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

const RadioGroup = ({value, radios, onChange}) => (
  <div className={styles.radioGroup}>
    {radios.map(radio => (
      <label key={radio.id} className={styles.radio}>
        <input
          type="checkbox"
          checked={value === radio.id}
          onClick={() => onChange(radio.id)}
        />
        <div
          className={classnames(styles.radioBubble, {
            [styles.radioBubbleChecked]: value === radio.id
          })}
        />
        <div>{radio.value}</div>
      </label>
    ))}
  </div>
);

RadioGroup.propTypes = {
  value: PropTypes.any,
  radios: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func
};

export default RadioGroup;
