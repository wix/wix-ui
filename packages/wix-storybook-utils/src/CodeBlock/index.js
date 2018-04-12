import React, {Component} from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

import Notification from 'wix-style-react/Notification';

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
    this.setState({showNotification: true});
  };

  render() {
    const {source, type, dataHook} = this.props;

    return (
      <div data-hook={dataHook}>
        <Notification
          onClose={() => this.setState({showNotification: false})}
          show={this.state.showNotification}
          size="small"
          theme="standard"
          timeout={3000}
          type="sticky"
          zIndex={10000}
          >
          <Notification.TextLabel>
            Copied!
          </Notification.TextLabel>

          <Notification.CloseButton/>
        </Notification>

        <TextButton onClick={this.onCopyClick}>Copy to clipboard</TextButton>

        <Markdown source={toCodeBlock(source, type)}/>
      </div>
    );
  }
}
