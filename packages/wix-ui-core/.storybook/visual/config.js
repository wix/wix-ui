import { configure } from '@storybook/react';

function loadStories() {
  const req = require.context('../../src/components', true, /\.visual\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

// Load stories
configure(loadStories, module);
