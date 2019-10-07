import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import classnames from 'classnames';
import { Collapse } from 'react-collapse';
import prettier from 'prettier/standalone';
import babylonParser from 'prettier/parser-babylon';
import { transform } from '@babel/core';

import { CopyButton } from '../CopyButton';
import ToggleSwitch from '../ui/toggle-switch';
import Revert from 'wix-ui-icons-common/Revert';
import Code from 'wix-ui-icons-common/Code';
import TextButton from '../TextButton';

import styles from './index.scss';

const randomPartialId = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

const generateId = () =>
  randomPartialId() + randomPartialId() + '-' + randomPartialId();

export default class LiveCodeExample extends Component {
  static propTypes = {
    initialCode: PropTypes.string,
    scope: PropTypes.object,
    compact: PropTypes.bool,
    previewRow: PropTypes.bool,
    previewProps: PropTypes.object,
    autoRender: PropTypes.bool,
    darkBackground: PropTypes.bool,
  };

  static defaultProps = {
    compact: false,
    previewRow: false,
    previewProps: {},
    autoRender: true,
    darkBackground: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      code: this.formatCode(props.initialCode),
      dirty: false,
      isRtl: false,
      isDarkBackground: props.darkBackground,
      isEditorOpened: !props.compact,
    };
  }

  formatCode = code => {
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

  resetCode = () =>
    this.setState({
      code: this.formatCode(this.props.initialCode),
      dirty: false,
      livePreviewKey: generateId(),
    });

  onCodeChange = code =>
    this.setState({ code, livePreviewKey: generateId(), dirty: true });

  onToggleRtl = isRtl => this.setState({ isRtl });
  onToggleBackground = isDarkBackground => this.setState({ isDarkBackground });

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

    const transformed = transform(withoutImports, {
      plugins: [
        require('@babel/plugin-syntax-jsx'),
        [require('@babel/plugin-proposal-class-properties'), { loose: true }],
      ],
    }).code;

    return transformed;
  };

  render() {
    const { compact, previewRow, previewProps, autoRender } = this.props;
    const { code, isRtl, isDarkBackground, isEditorOpened } = this.state;

    return (
      <div
        className={classnames(styles.wrapper, {
          [styles.compact]: compact,
        })}
      >
        {!compact && (
          <div className={styles.header}>
            <CopyButton source={this.state.code} />

            <div className={styles.spacer} />

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
          </div>
        )}

        <LiveProvider
          code={code.trim()}
          scope={this.props.scope}
          mountStylesheet={false}
          noInline={!autoRender}
          transformCode={this.transformCode}
        >
          <div className={styles.liveExampleWrapper}>
            <div
              className={classnames(styles.preview, previewProps.className, {
                rtl: isRtl,
                [styles.darkPreview]: isDarkBackground,
                [styles.compactPreview]: compact,
              })}
              dir={isRtl ? 'rtl' : ''}
            >
              <LivePreview
                key={this.state.livePreviewKey}
                {...previewProps}
                className={previewRow ? styles.previewRow : null}
              />
              <LiveError className={styles.error} />
            </div>

            <Collapse
              isOpened={isEditorOpened}
              className={classnames(styles.editor, {
                [styles.opened]: isEditorOpened,
              })}
            >
              <LiveEditor
                className={styles.editorView}
                onChange={this.onCodeChange}
              />
            </Collapse>
          </div>
        </LiveProvider>

        {compact && (
          <div className={styles.controlButtons}>
            <CopyButton source={this.state.code} />

            <div style={{ marginLeft: 'auto' }} />

            {this.state.dirty && (
              <TextButton onClick={this.resetCode} prefixIcon={<Revert />}>
                Reset
              </TextButton>
            )}

            <TextButton onClick={this.onToggleCode} prefixIcon={<Code />}>
              {this.state.isEditorOpened ? 'Hide' : 'Show'} code
            </TextButton>
          </div>
        )}
      </div>
    );
  }
}
