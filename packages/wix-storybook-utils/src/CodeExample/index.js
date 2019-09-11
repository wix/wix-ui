import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-collapse';
import styles from './styles.scss';

import CodeBlock from '../CodeBlock';
import TextButton from '../TextButton';

export default class CodeExample extends Component {
  static propTypes = {
    code: PropTypes.string,
    codeType: PropTypes.string,
    children: PropTypes.node,
    title: PropTypes.string,
    autoExpand: PropTypes.bool,
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    codeType: 'js',
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpened: !!props.autoExpand,
    };

    this.toggleCode = this.toggleCode.bind(this);
  }

  toggleCode() {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  }

  render() {
    const { dataHook, title, code, codeType, children } = this.props;

    return (
      <div data-hook={dataHook}>
        <div className={styles.panelControl} style={{ display: 'flex' }}>
          <h2>{title}</h2>

          <div style={{ margin: '22px 24px 0' }}>
            <TextButton onClick={this.toggleCode}>
              {this.state.isOpened ? 'Hide' : 'Show'} code
            </TextButton>
          </div>
        </div>

        <Collapse isOpened={this.state.isOpened}>
          <CodeBlock source={code} type={codeType} />
        </Collapse>

        <div>{children}</div>
      </div>
    );
  }
}
