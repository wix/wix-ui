import * as express from 'express';
import * as path from 'path';
import { Server } from 'http';

export const startServer = (port: number): Promise<Server> => {
  const app = express();

  return new Promise(resolve => {
    app.use(
      express.static(path.join(__dirname, '../../../../../storybook-static')),
    );
    resolve(
      app.listen(port, () => console.log(`Storybook listening on ${port}!`)),
    );
  });
};
