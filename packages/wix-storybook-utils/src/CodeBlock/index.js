import React, {Component} from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

import TextButton from '../TextButton';
import Markdown from '../Markdown';

const toCodeBlock = (code, type = 'js') =>
  ['```' + type, code.trim(), '```'].join('\n');

export default class CodeBlock extends Component {
  static propTypes = {
    source: PropTypes.string,
    type: PropTypes.string,
    dataHook: PropTypes.string
  };

  static defaultProps = {
    type: 'js'
  };

  state = {
    showNotification: false
  };

  onCopyClick = () => {
    copy(this.props.source);
    this.setState({showNotification: true}, () =>
      setTimeout(() => this.setState({showNotification: false}), 3000)
    );
  };

  render() {
    const {source, type, dataHook} = this.props;

    return (
      <div data-hook={dataHook}>
        <TextButton onClick={this.onCopyClick}>Copy to clipboard</TextButton>

        {this.state.showNotification && 'Copied!'}

        <Markdown source={toCodeBlock(source, type)}/>
      </div>
    );
  }
}
