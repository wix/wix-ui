import {Server} from 'http';
import * as express from 'express';

const storybookPath = './storybook-static';

export default class StorybookStaticsServer {
  private server: Server | null = null;

  start({port}: {port: 6006}) {
    return new Promise(resolve => {
      this.server = express()
        .use('/', express.static(storybookPath))
        .listen(port, resolve);
    });
  }

  stop() {
    return new Promise(resolve => {
      this.server && this.server.close(resolve);
    });
  }
}
