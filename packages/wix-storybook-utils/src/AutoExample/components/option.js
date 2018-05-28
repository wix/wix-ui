import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'wix-style-react/Grid';

import Markdown from '../../Markdown';
import styles from './styles.scss';

const Option = ({
  label,
  value,
  children,
  onChange,
  defaultValue,
  isRequired,
  dataHook
}) =>
  children ? (
    <Row
      dataHook={dataHook}
      className={styles.option}
      >
      <Col span={6}>
        <Markdown source={`\`${label}${isRequired ? '*' : ''}\``}/>
      </Col>

      <Col span={6}>
        {React.cloneElement(children, {
          value: children.type === 'div' ? value.toString() : value,
          defaultValue,
          onChange,

          // this is a hack to prevent warning im sorry, hopefully temporary,TODO
          ...(children.type === 'div' ? {} : {isRequired})
        })}
      </Col>
    </Row>
  ) : null;

Option.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  children: PropTypes.node,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  dataHook: PropTypes.string
};

export default Option;
