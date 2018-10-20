import React from 'react';
import {string, node, bool, object, oneOfType} from 'prop-types';
import SyntaxHighlighter, {
  registerLanguage
} from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import vs from 'react-syntax-highlighter/styles/prism/vs';

import styleclass from './CodeShowcase.st.css';
import List from './components/List';
import {iconShow} from './components/Show';
import {iconHide} from './components/Hide';

registerLanguage('jsx', jsx);

const customHighlighterStyle = {
  padding: '16px 0',
  border: 'none',
  fontFamily: `"HelveticaNeueW01-45Ligh","sans-serif"`,
  fontSize: '1.2em'
};

class CodeShowcase extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  toggleCodeShow = () => {
    this.setState({show: !this.state.show});
  };

  render() {
    const {
      code,
      title,
      description,
      link,
      inverted,
      theme,
      style,
      children
    } = this.props;
    const {show} = this.state;
    return (
      <div style={style} {...styleclass('root', {}, {className: theme})}>
        <section {...styleclass('demo', {inverted})}>
          <List>{children}</List>
        </section>
        <section className={styleclass.meta}>
          <a href={link} className={styleclass.title}>
            {title}
          </a>
          <div className={styleclass.description}>{description}</div>
          <span
            className={show ? styleclass.iconHide : styleclass.iconShow}
            onClick={this.toggleCodeShow}
          >
            {show ? iconHide : iconShow}
          </span>
        </section>
        <section className={show ? styleclass.code : styleclass.codeHide}>
          <SyntaxHighlighter
            customStyle={customHighlighterStyle}
            language="jsx"
            codeTagProps={{
              style: {fontFamily: `monospace`}
            }}
            style={vs}
          >
            {code}
          </SyntaxHighlighter>
        </section>
      </div>
    );
  }
}

CodeShowcase.propTypes = {
  title: string,
  children: node,
  code: string,
  inverted: bool,
  description: oneOfType([string, object]),
  link: string,
  theme: string,
  style: object,
  className: string
};

CodeShowcase.defaultProps = {
  title: 'Example',
  inverted: false,
  code: ''
};

export default CodeShowcase;
