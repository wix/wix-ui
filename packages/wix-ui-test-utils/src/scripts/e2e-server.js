const express = require('express');
const app = express();

const port = 6006;
const storybookPath = './storybook-static';
let server = app.use('/', express.static(storybookPath));

module.exports.server = {
  start: () => {
    server = server.listen(port, () => {
      console.log(`e2e sandbox running at http://localhost:${port}, serving ${storybookPath}`);
    });
  },
  stop: () => {
    server.close(() => {
      console.log('Finished all requests');
    });
  }
};
