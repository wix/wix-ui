/**
 * Storybook list of stories
 *
 * This is a file fixture used to test the stories.js codemod.
 */

require('./Introduction');
require('./Playground/Playground');

// 1. Foundations
require('../src/Typography/docs/index.story'); // 1.2 Typography
require('../src/new-icons/docs'); // 1.4 Icons

// TODO: move to correct position
require('../src/MyNewComponent/docs/index.story');

// TODO: move to correct position
require('../src/MyNewComponent/test/MyNewComponentStories');
