import {browser} from 'protractor';
import StorybookStaticsServer from '../servers/StorybookStaticsServer';

const storybookStaticsServer = new StorybookStaticsServer();

export default {
  baseUrl: 'http://localhost:6006/',
  specs: ['src/**/*.e2e.ts', 'src/**/*.e2e.js'],
  beforeLaunch() {
    return storybookStaticsServer.start({port: 6006});
  },
  onPrepare() {
    browser.ignoreSynchronization = true;
  },
  afterLaunch() {
    return storybookStaticsServer.stop();
  }
};
