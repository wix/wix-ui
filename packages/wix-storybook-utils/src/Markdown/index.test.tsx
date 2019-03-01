import * as React from 'react';
import { mount } from 'enzyme';

import Markdown from './';

describe('Markdown', () => {
  let originalGlobalSelf;

  // TODO: remove this ugly hack, once Markdown is not used for e2e
  beforeAll(() => {
    originalGlobalSelf = global.self;
    Object.defineProperty(global, 'self', {
      set: i => i,
    });

    global.self = null;
  });

  afterAll(() => {
    global.self = originalGlobalSelf;
  });

  it('should render markdown source with appropriate html', () => {
    const source = `# Heading

paragraph

\`\`\`js
'code';
\`\`\``;

    const html = mount(<Markdown source={source} />).html();

    expect(html).toContain('<h1>Heading</h1>');
    expect(html).toContain('<p>paragraph</p>');
    expect(html).toContain('<code class="language-js">');
    expect(html).toContain("'code'</span>");
  });

  it('should trim source before passing it to Remarkable', () => {
    const source = `

      123
    `;

    const html = mount(<Markdown source={source} />).html();
    expect(html).toContain('<p>123</p>');
  });
});
