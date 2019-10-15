import { header, code } from '../../src/Sections';

import importsExample from '!raw-loader!../components/examples/code-with-imports';
import classWithArrowsExample from '!raw-loader!../components/examples/class-with-arrows';

export default {
  category: 'Sections',
  storyName: 'Code Examples',
  sections: [
    header({ title: 'Code examples story' }),
    code(importsExample),
    code({
      source: classWithArrowsExample,
      autoRender: false,
    }),
  ],
};
