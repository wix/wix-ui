import {Server} from 'http';
import * as express from 'express';

const storybookPath = './storybook-static';

export default class StorybookStaticsServer {
  private server: Server;

  start({port}: {port: 6006}) {
    this.server = express()
      .use('/', express.static(storybookPath))
      .listen(port, () => {
        console.log(`e2e sandbox running at http://localhost:${port}, serving ${storybookPath}`);
      });
  }

  stop() {
    this.server.close(() => {
      console.log('Finished all requests');
    });
  }
}
