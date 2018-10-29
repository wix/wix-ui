import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import classnames from 'classnames';
import {Collapse} from 'react-collapse';
import copy from 'copy-to-clipboard';
import styles from './index.scss';

import Notification from 'wix-style-react/Notification';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import Revert from 'wix-ui-icons-common/Revert';
import Code from 'wix-ui-icons-common/Code';
import Document from 'wix-ui-icons-common/Document';
import TextButton from '../TextButton';

export default class LiveCodeExample extends Component {

  static propTypes = {
    initialCode: PropTypes.string,
    title: PropTypes.string,
    scope: PropTypes.object,
    compact: PropTypes.bool
  };

  static defaultProps = {
    compact: false
  };

  resetCode = () => {
    this.setState({
      code: this.props.initialCode
    });
  };

  onCodeChange = code => this.setState({code});

  onToggleRtl = isRtl => this.setState({isRtl});
  onToggleBackground = isDarkBackground => this.setState({isDarkBackground});

  onToggleCode = () => this.setState(state => ({
    isEditorOpened: !state.isEditorOpened
  }));

  onCopyClick = () => {
    copy(this.state.code);
    this.setState({showNotification: true});
  };

  constructor(props) {
    super(props);

    this.state = {
      code: props.initialCode,
      isRtl: false,
      isDarkBackground: false,
      isEditorOpened: !props.compact,
      showNotification: false
    };
  }

  renderCopyButton() {
    return (
      <TextButton onClick={this.onCopyClick} prefixIcon={<Document/>}>Copy to clipboard</TextButton>
    );
  }

  render() {
    const {compact} = this.props;
    const {code, isRtl, isDarkBackground, isEditorOpened} = this.state;

    return (
      <div
        className={classnames(styles.wrapper, {
          [styles.compact]: compact
        })}
      >

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

        <div className={styles.header}>
          <h2>{this.props.title}</h2>

          <div className={styles.spacer}/>

          <div className={styles.headerControl}>
            Imitate RTL:&nbsp;

            <ToggleSwitch
              size="small"
              checked={isRtl}
              onChange={e => this.onToggleRtl(e.target.checked)}
            />
          </div>

          <div className={styles.headerControl}>
            Dark Background:&nbsp;

            <ToggleSwitch
              size="small"
              checked={isDarkBackground}
              onChange={e => this.onToggleBackground(e.target.checked)}
            />
          </div>

          {!compact && (
            this.renderCopyButton()
          )}

          {isEditorOpened && (
            <TextButton onClick={this.resetCode} prefixIcon={<Revert/>}>Reset</TextButton>
          )}

          {compact && (
            <TextButton onClick={this.onToggleCode} prefixIcon={<Code/>}>
              {this.state.isEditorOpened ? 'Hide' : 'Show'} code
            </TextButton>
          )}
        </div>

        <LiveProvider code={code.trim()} scope={this.props.scope} mountStylesheet={false}>
          <div className={styles.liveExampleWrapper}>

            <Collapse
              isOpened={isEditorOpened}
              className={classnames(styles.editor, {
                [styles.opened]: isEditorOpened
              })}
            >
              <LiveEditor className={styles.editorView} onChange={this.onCodeChange}/>
            </Collapse>

            <div
              className={classnames(styles.preview, {
                rtl: isRtl,
                [styles.darkPreview]: isDarkBackground
              })}
              dir={isRtl ? 'rtl' : ''}
            >
              <LivePreview/>
              <LiveError className={styles.error}/>
            </div>
          </div>
        </LiveProvider>

        {(isEditorOpened && compact) && (
          this.renderCopyButton()
        )}
      </div>
    );
  }

}
