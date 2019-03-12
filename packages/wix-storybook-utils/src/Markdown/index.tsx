import * as React from 'react';
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

interface Props {
  source: string;
  className?: string;
  dataHook?: string;
}

const options = {
  html: true,
  linkTarget: '_parent',
  highlight: (code, lang) => hljs.highlight(lang, code).value,
};

const Markdown: React.FunctionComponent<Props> = ({
  source,
  className,
  dataHook,
}) => {
  // TODO: remove this hack
  // it can be done once AutoExample is no loner used in E2E throughout wix-ui and wix-style-react
  if (global.self === global.top) {
    return null;
  }

  return (
    <div data-hook={dataHook} className={className || 'markdown-body'}>
      <Remarkable source={source.trim()} options={options} />
    </div>
  );
};

export default Markdown;
