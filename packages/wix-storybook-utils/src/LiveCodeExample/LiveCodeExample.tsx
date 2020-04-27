import React from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import classnames from 'classnames';
import { Collapse } from 'react-collapse';
import prettier from 'prettier/standalone';
import babylonParser from 'prettier/parser-babylon';
import { transform } from '@babel/core';
import debounce from 'lodash/debounce';

import DuplicateSmall from 'wix-ui-icons-common/DuplicateSmall';
import RevertSmall from 'wix-ui-icons-common/RevertSmall';
import CodeSmall from 'wix-ui-icons-common/CodeSmall';
import MagicWandSmall from 'wix-ui-icons-common/MagicWandSmall';

import { CopyButton } from '../CopyButton';
import ToggleSwitch from '../ui/toggle-switch';
import TextButton from '../TextButton';
import { tokenHighlighter } from './token-highlighter';

import styles from './index.scss';

const safeTokenHighlighter = (code: string) => {
  try {
    return tokenHighlighter(code);
  } catch (e) {
    console.warn('Unable to tokenize code', e);
    return <span>{code}</span>;
  }
};

interface Props {
  initialCode?: string;
  scope?: object;
  compact?: boolean;
  initiallyOpen?: boolean;
  previewRow?: boolean;
  previewProps?: object & { className?: string };
  autoRender?: boolean;
  darkBackground?: boolean;
  noBackground?: boolean;
}

interface State {
  code: string;
  dirty: boolean;
  isRtl: boolean;
  isDarkBackground: boolean;
  isEditorOpened: boolean;
  parseError: object | null;
}

export default class LiveCodeExample extends React.Component<Props, State> {
  debouncedOnCodeChange: () => any;

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
  };

  constructor(props: Props) {
    super(props);

    this.debouncedOnCodeChange = debounce(this.onCodeChange, 100);

    this.state = {
      code: this.formatCode(props.initialCode),
      dirty: false,
      isRtl: false,
      isDarkBackground: props.darkBackground,
      isEditorOpened: !props.compact || props.initiallyOpen,
      parseError: null,
    };
  }

  formatCode = (code: string) => {
    const filteredCode = code
      .split('\n')
      .filter(
        line =>
          !/\/(\*|\/)+.*((t|e)slint[-|:](dis|en)able|prettier-ignore)/.test(
            line,
          ),
      )
      .join('\n');

    return prettier.format(filteredCode, {
      parser: 'babel',
      plugins: [babylonParser],
      singleQuote: true,
      trailingComma: 'all',
    });
  };

  prettifyCode = () =>
    this.setState(({ code }) => ({ code: this.formatCode(code) }));

  resetCode = () =>
    this.setState({
      code: this.formatCode(this.props.initialCode),
      dirty: false,
    });

  onCodeChange = (code: string) => this.setState({ code, dirty: true });

  onToggleRtl = (isRtl: boolean) => this.setState({ isRtl });
  onToggleBackground = (isDarkBackground: boolean) =>
    this.setState({ isDarkBackground });

  onToggleCode = () =>
    this.setState(state => ({
      isEditorOpened: !state.isEditorOpened,
    }));

  transformCode = (code = '') => {
    const withoutImports = code
      .split('\n')
      .filter(
        line =>
          ![
            // ignore import/export statements
            /^[\s]*?(import|export)/,
            // ignore require calls
            /\S*?require\(['"]\S*?['"]\)/,
          ].some(regex => regex.test(line)),
      )
      .join('\n');

    try {
      const transformed = transform(withoutImports, {
        plugins: [
          require('@babel/plugin-syntax-jsx'),
          [require('@babel/plugin-proposal-class-properties'), { loose: true }],
        ],
      });
      this.setState({ parseError: null });
      return transformed.code;
    } catch (error) {
      this.setState({ parseError: error.message });
      return withoutImports;
    }
  };

  render() {
    const {
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
      parseError,
    } = this.state;

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

            {this.state.dirty && (
              <div className={styles.headerControl}>
                <TextButton
                  onClick={this.prettifyCode}
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

            {this.state.dirty && (
              <TextButton onClick={this.resetCode} prefixIcon={<RevertSmall />}>
                Reset
              </TextButton>
            )}
          </div>
        )}

        <LiveProvider
          code={code.trim()}
          scope={this.props.scope}
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
              <LivePreview
                {...previewProps}
                className={previewRow ? styles.previewRow : null}
              />

              {parseError ? (
                <div className={styles.error}>{parseError}</div>
              ) : (
                <LiveError className={styles.error} />
              )}
            </div>

            <Collapse
              isOpened={isEditorOpened}
              className={classnames(styles.editor, {
                [styles.opened]: isEditorOpened,
              })}
            >
              <LiveEditor
                onChange={this.debouncedOnCodeChange}
                className={styles.editorView}
                // @ts-ignore because react-live does not expose typings of their internal usage of `react-simple-code-editor which support `highlight` prop even though react-live spreads props onto that component
                highlight={safeTokenHighlighter}
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

            {this.state.dirty && (
              <TextButton
                onClick={this.prettifyCode}
                prefixIcon={<MagicWandSmall />}
              >
                Prettify
              </TextButton>
            )}

            <div style={{ marginLeft: 'auto' }} />

            {this.state.dirty && (
              <TextButton onClick={this.resetCode} prefixIcon={<RevertSmall />}>
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
