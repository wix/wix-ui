import { mount } from 'enzyme';

import { importExample as view } from './';
import { importExample as builder } from '../../index';

const storyConfigFixture = {
  metadata: { displayName: 'Component', props: {} },
  config: {},
};

describe('importExample view', () => {
  it('should pass trimmed and ticked source to markdown', () => {
    const source = `
"hello"
    `;

    const assertion = `\`\`\`js
\"hello\"
\`\`\``;

    const rendered = mount(view(builder({ source }), storyConfigFixture));
    expect(rendered.find('Markdown').prop('source')).toEqual(assertion);
  });

  describe('given no arguments', () => {
    it('should construct importExample from StoryConfig', () => {
      const assertion = `\`\`\`js
import Component from 'library/Component';
\`\`\``;

      const rendered = mount(
        view(builder(), {
          ...storyConfigFixture,
          config: {
            importFormat:
              "import %componentName from '%moduleName/%componentName';",
            moduleName: 'library',
          },
        }),
      );
      expect(rendered.find('Markdown').prop('source')).toEqual(assertion);
    });
  });
});
