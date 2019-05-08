import { header, code } from '../../Sections';

import importsExample from '!raw-loader!../examples/code-with-imports';
import classWithArrowsExample from '!raw-loader!../examples/class-with-arrows';

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
