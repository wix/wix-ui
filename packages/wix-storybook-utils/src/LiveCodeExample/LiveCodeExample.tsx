import React from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import classnames from 'classnames';
import { Collapse } from 'react-collapse';
import debounce from 'lodash/debounce';
import { DebouncedFunc } from 'lodash';
import { UnControlled as ReactCodeMirror } from 'react-codemirror2';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';

import './styles.global.scss';
import DuplicateSmall from '../icons/DuplicateSmall';
import RevertSmall from '../icons/RevertSmall';
import CodeSmall from '../icons/CodeSmall';
import MagicWandSmall from '../icons/MagicWandSmall';

import { transformCode, formatCode } from './doctor-code';
import { CopyButton } from '../CopyButton';
import ToggleSwitch from '../ui/toggle-switch';
import TextButton from '../TextButton';

import styles from './index.scss';

interface Hint {
  attrs: Record<string, any>;
}

export interface Props {
  initialCode?: string;
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
  hints?: Record<string, Hint>;
}

interface State {
  initialFormattedCode: string;
  code: string;
  isRtl: boolean;
  isDarkBackground: boolean;
  isEditorOpened: boolean;
  parseError: object | null;
  renderPreview: boolean;
  editorInstance: CodeMirror.Editor | null;
}
export default class LiveCodeExample extends React.PureComponent<Props, State> {
  debouncedOnCodeChange: DebouncedFunc<() => any>;

  static propTypes = {
    initialCode: PropTypes.string,
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

    this.debouncedOnCodeChange = debounce(this.onCodeChange, 100, {
      trailing: true,
    });

    const formattedCode = formatCode(props.initialCode).trim();

    this.state = {
      initialFormattedCode: formattedCode,
      code: formattedCode,
      isRtl: false,
      isDarkBackground: props.darkBackground,
      isEditorOpened: !props.compact || props.initiallyOpen,
      parseError: null,
      renderPreview: !Boolean(props.previewWarning),
      editorInstance: null,
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

  prettifyCode = () => {
    try {
      this.setState(
        ({ code }) => ({ code: formatCode(code) }),
        () => this.setEditorValue(this.state.code),
      );
    } catch (e) {
      console.error('Unable to prettify code', e);
    }
  };

  liveEditorOnKeyDown = (editor: CodeMirror.Editor, e: KeyboardEvent) => {
    const shouldPrettify = [
      /* windows & unix: ctrl + s */
      e.ctrlKey && e.key === 's',

      /* osx: command + s */
      e.metaKey && e.key === 's',
    ].some(Boolean);

    if (shouldPrettify) {
      e.stopPropagation();
      e.preventDefault();

      const editorDoc = editor.getDoc();
      const { ch, line } = editorDoc.getCursor();

      this.prettifyCode();

      editorDoc.setCursor({ ch, line });
    }
  };

  onResetCode = () => {
    const code = formatCode(this.props.initialCode);
    this.setEditorValue(code);
    this.setState({ code });
  };

  onCodeChange = (_editor, _data, code) =>
    this.setState({ code }, () => this.props.onChange(this.state.code));

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

  setEditorValue = (value: string) => {
    this.state.editorInstance.getDoc().setValue(value);
  };

  editorDidMount = (editor: CodeMirror.Editor) => {
    this.setState({ editorInstance: editor }, () =>
      this.setEditorValue(this.state.initialFormattedCode),
    );
  };

  completeAfter = (
    codemirror: CodeMirror.Editor,
    predicate?: () => boolean,
  ) => {
    if (!predicate || predicate()) {
      setTimeout(() => {
        if (!codemirror.state.completionActive) {
          codemirror.showHint({ completeSingle: false });
        }
      }, 100);
    }

    return CodeMirror.Pass;
  };

  completeIfAfterLt = (codemirror: CodeMirror.Editor) =>
    this.completeAfter(codemirror, () => {
      const cursorPosition = codemirror.getCursor();

      return (
        codemirror.getRange(
          CodeMirror.Pos(cursorPosition.line, cursorPosition.ch - 1),
          cursorPosition,
        ) === '<'
      );
    });

  completeIfInTag = (codemirror: CodeMirror.Editor) => {
    return this.completeAfter(codemirror, () => {
      const token = codemirror.getTokenAt(codemirror.getCursor());
      if (
        token.type === 'string' &&
        (!/['"]/.test(token.string.charAt(token.string.length - 1)) ||
          token.string.length === 1)
      ) {
        return false;
      }

      const inner = CodeMirror.innerMode(codemirror.getMode(), token.state)
        .state;
      return inner.tagName;
    });
  };

  render() {
    const {
      scope,
      compact,
      previewRow,
      previewProps,
      autoRender,
      noBackground,
      hints,
    } = this.props;

    const {
      code,
      isRtl,
      isDarkBackground,
      isEditorOpened,
      renderPreview,
    } = this.state;

    const dirty = this.state.initialFormattedCode !== this.state.code;

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
              <ReactCodeMirror
                onChange={this.debouncedOnCodeChange}
                editorDidMount={this.editorDidMount}
                onKeyDown={this.liveEditorOnKeyDown}
                options={{
                  mode: 'jsx',
                  autoCloseTags: true,
                  autoCloseBrackets: true,
                  theme: 'wsr',
                  viewportMargin: 50,
                  lineNumbers: true,
                  hintOptions: {
                    schemaInfo: hints,
                  } as CodeMirror.ShowHintOptions,
                  extraKeys: {
                    Tab: codemirror => {
                      if (codemirror.somethingSelected()) {
                        codemirror.indentSelection('add');
                      } else {
                        const indent = codemirror.getOption('indentUnit');
                        const spaces = Array(indent + 1).join(' ');
                        codemirror.replaceSelection(spaces);
                      }
                    },
                    'Cmd-I': this.completeIfInTag,
                    "'<'": this.completeAfter,
                    "'/'": this.completeIfAfterLt,
                    "' '": this.completeIfInTag,
                    Enter: this.completeIfInTag,
                    "'='": this.completeIfInTag,
                  },
                }}
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
