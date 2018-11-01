import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Cell } from '../../ui/Layout';

import Markdown from '../../Markdown';
import styles from './styles.scss';

const Option = ({
  label,
  value,
  children,
  onChange,
  defaultValue,
  isRequired,
  dataHook,
}) =>
  children ? (
    <Layout dataHook={dataHook} className={styles.option}>
      <Cell span={5}>
        <Markdown source={`\`${label}${isRequired ? '*' : ''}\``} />
      </Cell>

      <Cell span={7}>
        {React.cloneElement(children, {
          value: children.type === 'div' ? value.toString() : value,
          defaultValue,
          onChange,
        })}
      </Cell>
    </Layout>
  ) : null;

Option.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  children: PropTypes.node,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  dataHook: PropTypes.string,
};

export default Option;
