import React from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import classnames from 'classnames';
import { Collapse } from 'react-collapse';

import DuplicateSmall from '../icons/DuplicateSmall';
import RevertSmall from '../icons/RevertSmall';
import CodeSmall from '../icons/CodeSmall';
import MagicWandSmall from '../icons/MagicWandSmall';

import { transformCode, formatCode } from './doctor-code';
import { CopyButton } from '../CopyButton';
import ToggleSwitch from '../ui/toggle-switch';
import TextButton from '../TextButton';
import Editor from './Editor';
import styles from './index.scss';
import { getComponentsHints } from '../utils';
import { ComponentsHints } from '../typings/components-hints';

export interface Props {
  initialCode?: string;
  title?: string;
  storyName?: string;
  scope?: object;
  compact?: boolean;
  initiallyOpen?: boolean;
  previewRow?: boolean;
  previewProps?: object & { className?: string };
  autoRender?: boolean;
  darkBackground?: boolean;
  noBackground?: boolean;
  onChange?: Function;
  previewWarning?({ onConfirm: Function }): React.ReactNode | null;
  hints?: ComponentsHints;
}

interface State {
  initialOriginalCode: string;
  initialFormattedCode: string;
  code: string;
  isRtl: boolean;
  isDarkBackground: boolean;
  isEditorOpened: boolean;
  parseError: object | null;
  renderPreview: boolean;
  setEditorValue: Function;
  hints?: ComponentsHints;
}

export default class LiveCodeExample extends React.PureComponent<Props, State> {
  static propTypes = {
    initialCode: PropTypes.string,
    title: PropTypes.string,
    storyName: PropTypes.string,
    scope: PropTypes.object,
    compact: PropTypes.bool,
    initiallyOpen: PropTypes.bool,
    previewRow: PropTypes.bool,
    previewProps: PropTypes.object,
    autoRender: PropTypes.bool,
    darkBackground: PropTypes.bool,
    noBackground: PropTypes.bool,
  };

  static defaultProps = {
    compact: false,
    initiallyOpen: false,
    previewRow: false,
    previewProps: {},
    autoRender: true,
    darkBackground: false,
    noBackground: false,
    onChange: () => {},
    scope: {},
  };

  constructor(props: Props) {
    super(props);

    const {
      storyName,
      title,
      initialCode,
      darkBackground,
      compact,
      initiallyOpen,
      previewWarning,
    } = props;

    const codeFromStorage = window.sessionStorage.getItem(
      `${storyName}-${title}`,
    );
    const initialOriginalCode = formatCode(initialCode).trim();

    const formattedCode = codeFromStorage
      ? codeFromStorage
      : initialOriginalCode;
    this.state = {
      initialOriginalCode,
      initialFormattedCode: formattedCode,
      code: formattedCode,
      isRtl: false,
      isDarkBackground: darkBackground,
      isEditorOpened: !compact || initiallyOpen,
      parseError: null,
      renderPreview: !Boolean(previewWarning),
      setEditorValue: null,
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { renderPreview } = this.state;

    if (
      this.props.previewWarning !== prevProps.previewWarning &&
      typeof prevProps.previewWarning === 'function' &&
      renderPreview
    ) {
      this.setState({ renderPreview: false });
    }
  }

  componentDidMount() {
    const { hints, scope } = this.props;
    this.setState({ hints: hints || getComponentsHints(scope) });
  }

  prettifyCode = () => {
    try {
      this.setState(
        ({ code }) => ({ code: formatCode(code) }),
        () => this.state.setEditorValue(this.state.code),
      );
    } catch (e) {
      console.error('Unable to prettify code', e);
    }
  };

  onResetCode = () => {
    const code = formatCode(this.props.initialCode);
    this.state.setEditorValue(code);
    this.setState({ code });
  };

  onEditorChange = code => {
    const { title, onChange, storyName } = this.props;
    this.setState({ code }, () => onChange(this.state.code));
    window.sessionStorage.setItem(`${storyName}-${title}`, code);
  };

  onToggleRtl = (isRtl: boolean) => this.setState({ isRtl });
  onToggleBackground = (isDarkBackground: boolean) =>
    this.setState({ isDarkBackground });

  onToggleCode = () =>
    this.setState(state => ({
      isEditorOpened: !state.isEditorOpened,
    }));

  transformCode = (code = '') => {
    const { parseError } = this.state;
    let newParseError;
    let returnValue = code;

    try {
      returnValue = transformCode(code);
      newParseError = null;
    } catch (error) {
      newParseError = error.message;
    }

    if (newParseError !== parseError) {
      this.setState({ parseError: newParseError });
    }

    return returnValue;
  };

  previewWarning = () =>
    this.props.previewWarning({
      onConfirm: () => this.setState({ renderPreview: true }),
    });

  renderError = () => {
    if (this.state.renderPreview) {
      return this.state.parseError ? (
        <div className={styles.error}>{this.state.parseError}</div>
      ) : (
        <LiveError className={styles.error} />
      );
    }

    return null;
  };

  render() {
    const {
      scope,
      compact,
      previewRow,
      previewProps,
      autoRender,
      noBackground,
    } = this.props;

    const {
      code,
      isRtl,
      isDarkBackground,
      isEditorOpened,
      renderPreview,
      hints,
    } = this.state;

    const dirty = this.state.initialOriginalCode !== this.state.code;

    return (
      <div
        className={classnames(styles.wrapper, {
          [styles.compact]: compact,
        })}
      >
        {!compact && (
          <div className={styles.header}>
            <CopyButton
              source={this.state.code}
              prefixIcon={<DuplicateSmall />}
            />

            <div className={styles.spacer} />

            {dirty && (
              <div className={styles.headerControl}>
                <TextButton
                  onClick={() => this.prettifyCode()}
                  prefixIcon={<MagicWandSmall />}
                >
                  Prettify
                </TextButton>
              </div>
            )}

            <div className={styles.headerControl}>
              Imitate RTL:&nbsp;
              <ToggleSwitch
                size="small"
                checked={isRtl}
                onChange={this.onToggleRtl}
              />
            </div>

            <div className={styles.headerControl}>
              Dark Background:&nbsp;
              <ToggleSwitch
                size="small"
                checked={isDarkBackground}
                onChange={this.onToggleBackground}
              />
            </div>

            {dirty && (
              <TextButton
                onClick={this.onResetCode}
                prefixIcon={<RevertSmall />}
              >
                Reset
              </TextButton>
            )}
          </div>
        )}

        <LiveProvider
          code={code.trim()}
          scope={{ isRtl, ...scope }}
          noInline={!autoRender}
          transformCode={this.transformCode}
        >
          <div className={styles.liveExampleWrapper}>
            <div
              className={classnames(styles.preview, previewProps.className, {
                rtl: isRtl,
                [styles.darkPreview]: isDarkBackground,
                [styles.compactPreview]: compact && !noBackground,
              })}
              dir={isRtl ? 'rtl' : ''}
            >
              {renderPreview ? (
                <LivePreview
                  {...previewProps}
                  className={previewRow ? styles.previewRow : null}
                />
              ) : (
                this.previewWarning()
              )}

              {this.renderError()}
            </div>
            <Collapse isOpened={isEditorOpened} className={styles.editor}>
              <Editor
                initialFormattedCode={this.state.initialFormattedCode}
                onChange={this.onEditorChange}
                hints={hints}
                editorCodeUpdater={updater =>
                  this.setState({ setEditorValue: updater })
                }
              />
            </Collapse>
          </div>
        </LiveProvider>

        {compact && (
          <div className={styles.controlButtons}>
            <CopyButton
              source={this.state.code}
              prefixIcon={<DuplicateSmall />}
            />

            {dirty && (
              <TextButton
                onClick={() => this.prettifyCode()}
                prefixIcon={<MagicWandSmall />}
              >
                Prettify
              </TextButton>
            )}

            <div style={{ marginLeft: 'auto' }} />

            {dirty && (
              <TextButton
                onClick={this.onResetCode}
                prefixIcon={<RevertSmall />}
              >
                Reset
              </TextButton>
            )}

            <TextButton onClick={this.onToggleCode} prefixIcon={<CodeSmall />}>
              {this.state.isEditorOpened ? 'Hide' : 'Show'} code
            </TextButton>
          </div>
        )}
      </div>
    );
  }
}
