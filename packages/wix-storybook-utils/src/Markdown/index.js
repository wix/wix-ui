import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Remarkable from 'react-remarkable';
import hljs from 'highlight.js/lib/highlight.js';
import './style.scss';

hljs.registerLanguage(
  'javascript',
  require('highlight.js/lib/languages/javascript.js'),
);

hljs.registerLanguage(
  'typescript',
  require('highlight.js/lib/languages/typescript.js'),
);

hljs.registerLanguage('css', require('highlight.js/lib/languages/css.js'));

hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss.js'));

hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml.js'));

hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash.js'));

hljs.registerLanguage(
  'markdown',
  require('highlight.js/lib/languages/markdown.js'),
);

hljs.registerLanguage(
  'django',
  require('highlight.js/lib/languages/django.js'),
);

export default class Markdown extends Component {
  static propTypes = {
    source: PropTypes.string,
    className: PropTypes.string,
  };

  render() {
    const shouldHideForE2E = global.self === global.top;

    const options = {
      html: true,
      linkTarget: '_parent',
      highlight(code, lang) {
        return hljs.highlight(lang, code).value;
      },
    };
    const { source, className } = this.props;
    return !shouldHideForE2E ? (
      <div className={className || 'markdown-body'}>
        <Remarkable source={source} options={options} />
      </div>
    ) : null;
  }
}
