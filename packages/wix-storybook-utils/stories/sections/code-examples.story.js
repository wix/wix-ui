import { header, code } from '../../Sections';

import importsExample from '!raw-loader!../examples/code-with-imports';

export default {
  category: 'Sections',
  storyName: 'Code Examples',
  sections: [header({ title: 'yo' }), code(importsExample)]
};
