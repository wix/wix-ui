import { mount } from 'enzyme';

import { importExample as view } from './';
import { importExample as builder } from '../../index';

describe('importExample view', () => {
  it('should pass trimmed and ticked source to markdown', () => {
    const source = `
"hello"
    `;

    const assertion = `\`\`\`js
\"hello\"
\`\`\``;

    const rendered = mount(view(builder({ source })));
    expect(rendered.find('Markdown').prop('source')).toEqual(assertion);
  });
});
