import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextButton from '../TextButton';
import copy from 'copy-to-clipboard';
import Markdown from '../Markdown';
import Notification from 'wix-style-react/Notification';

const toCodeBlock = (code, type = 'js') =>
  ['```' + type, code.trim(), '```'].join('\n');

export default class CodeBlock extends Component {

  static propTypes = {
    source: PropTypes.string,
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'js'
  };

  constructor(props) {
    super(props);
    this.state = {showNotification: false};
  }

  render() {
    const {source, type} = this.props;
    const copyToClipboardClicked = () => {
      copy(source);
      this.setState({showNotification: true});
    };
    return (
      <div>
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

        <TextButton onClick={copyToClipboardClicked}>Copy to clipboard</TextButton>
        <Markdown source={toCodeBlock(source, type)}/>
      </div>
    );
  }
}
