import React from 'react';
import {string, node, bool} from 'prop-types';
import classNames from 'classnames';
import style from './CodeShowcase.st.css';
import Markdown from '../Markdown';

const toCodeBlock = (code, type = 'html') =>
  ['```' + type, code.trim(), '```'].join('\n');

export default class CodeShowcase extends React.Component {
  static propTypes = {
    title: string,
    children: node,
    code: string,
    inverted: bool,
    theme: string
  };
  static defaultProps = {
    title: 'Example',
    inverted: false
  };
  render() {
    const {title, children, code, inverted, theme} = this.props;
    return (
      <div className={style.root}>
        <h3 className={style.title}>{title}</h3>
        <div className={classNames(style.content, theme)}>
          <div {...style('show', {inverted}, this.props)}>{children}</div>
          <Markdown className={style.markdown} source={toCodeBlock(code)}/>
        </div>
      </div>
    );
  }
}
