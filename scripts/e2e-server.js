const express = require('express');
const app = express();

const port = 6006;
const storybookPath = './storybook-static';

app
  .use('/', express.static(storybookPath))
  .listen(6006, () => {
    console.log(`e2e sandbox running at http://localhost:${port}, serving ${storybookPath}`);
  });
