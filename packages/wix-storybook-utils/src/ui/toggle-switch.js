import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ToggleOff, ToggleOn } from 'wix-ui-icons-common/system';

import styles from './styles.scss';

const ToggleSwitch = ({ checked, size, onChange }) => (
  <div
    className={classnames(styles.toggleSwitch, {
      [styles.toggleSwitchChecked]: checked,
      [styles.toggleSwitchSmall]: size === 'small',
    })}
    onClick={() => onChange(!checked)}
  >
    <div className={styles.toggleSwitchTrack} />
    <div className={styles.toggleSwitchKnob}>
      {checked ? <ToggleOn /> : <ToggleOff />}
    </div>
  </div>
);

ToggleSwitch.defaultProps = {
  size: 'normal',
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'normal']),
  onChange: PropTypes.func,
};

export default ToggleSwitch;
