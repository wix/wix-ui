import React from 'react';
import { string, node, bool, object, oneOfType } from 'prop-types';
import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import vs from 'react-syntax-highlighter/styles/prism/vs';
import classnames from 'classnames';

import styles from './CodeShowcase.scss';
import List from './components/List';
import { iconShow } from './components/Show';
import { iconHide } from './components/Hide';

registerLanguage('jsx', jsx);

const customHighlighterStyle = {
  padding: '16px 0',
  border: 'none',
  fontFamily: `"HelveticaNeueW01-45Ligh","sans-serif"`,
  fontSize: '1.2em',
};

class CodeShowcase extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  toggleCodeShow = () => {
    this.setState({ show: !this.state.show });
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
      children,
    } = this.props;
    const { show } = this.state;
    return (
      <div style={style} className={classnames(styles.root, theme)}>
        <section className={styles.demo}>
          <List inverted={inverted}>{children}</List>
        </section>
        <section className={styles.meta}>
          <a href={link} className={styles.title}>
            {title}
          </a>
          <div className={styles.description}>{description}</div>
          <span
            className={show ? styles.iconHide : styles.iconShow}
            onClick={this.toggleCodeShow}
          >
            {show ? iconHide : iconShow}
          </span>
        </section>
        <section className={show ? styles.code : styles.codeHide}>
          <SyntaxHighlighter
            customStyle={customHighlighterStyle}
            language="jsx"
            codeTagProps={{
              style: { fontFamily: `monospace` },
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
  className: string,
};

CodeShowcase.defaultProps = {
  title: 'Example',
  inverted: false,
  code: '',
};

export default CodeShowcase;
