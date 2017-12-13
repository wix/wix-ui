const express = require('express');
const app = express();

const port = 6006;
const storybookPath = './storybook-static';

app
  .use('/', express.static(storybookPath))
  .listen(port, () => {
    console.log(`e2e sandbox running at http://localhost:${port}, serving ${storybookPath}`);
  });
