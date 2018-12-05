import * as eventually from 'wix-eventually';

// Some tests are skipped because it either passes with jsdom and fails with browser (mocha-runner)
describe('Video/getSDK', () => {
  let getSDK;
  let loadjs;

  describe('success pass', () => {
    beforeEach(() => {
      if (typeof jest.mock === 'function') {
        jest.mock('loadjs', () => jest.fn().mockImplementation((url, settings) => {
          setTimeout(() => settings.success(), 200);
        }));
      }

      loadjs = require('loadjs');
      getSDK = require('./getSDK').getSDK;
    });

    afterEach(() => {
      if (typeof jest.resetModules === 'function') {
        jest.resetModules();
      }
    });

    xit('should be resolved', async () => {
      const resolveSpy = jest.fn();

      getSDK({
        name: 'YT',
        url: 'https://www.youtube.com/iframe_api',
        isLoaded: () => false,
      }).then(resolveSpy);

      await eventually(() => {
        expect(loadjs).toHaveBeenCalled();
        expect(resolveSpy).toHaveBeenCalled()
      });
    });

    xit('should multiple request be resolved with one load of SDK', async () => {
      const resolveSpy1 = jest.fn();
      const resolveSpy2 = jest.fn();

      getSDK({
        name: 'FB',
        url: '//connect.facebook.net/en_US/sdk.js',
        isLoaded: () => false,
      }).then(resolveSpy1);

      getSDK({
        name: 'FB',
        url: '//connect.facebook.net/en_US/sdk.js',
        isLoaded: () => false,
      }).then(resolveSpy2);

      await eventually(() => {
        expect(loadjs).toHaveBeenCalledTimes(1);
        expect(resolveSpy1).toHaveBeenCalled();
        expect(resolveSpy2).toHaveBeenCalled();
      });
    });

    it('should resolve when SDK already loaded', async () => {
      const resolveSpy = jest.fn();

      (window as any).MOCKPLAYERSDK = true;

      getSDK({
        name: 'MOCKPLAYERSDK',
        url: '//test.com/sdk.js',
        isLoaded: () => true,
      }).then(resolveSpy);

      await eventually(() => {
        expect(resolveSpy).toHaveBeenCalled();
      });

      // expect(loadjs).not.toHaveBeenCalled();
    });

    it('should resolve when require allow and exist', async () => {
      const resolveSpy = jest.fn();

      (window as any).require = jest.fn().mockImplementation((url, settings) => {
        setTimeout(() => settings(), 200);
      });
      (window as any).define = jest.fn();
      (window as any).define.amd = true;

      getSDK({
        name: 'MOCKREQUIREPLAYER',
        url: '//test.com/mock-sdk.js',
        isLoaded: () => true,
        isRequireAllow: true,
      }).then(resolveSpy);

      await eventually(() => {
        expect(resolveSpy).toHaveBeenCalled();
      });

      expect((window as any).require).toHaveBeenCalled();
      // expect(loadjs).not.toHaveBeenCalled();
    });
  });

  describe('failure pass', () => {
    beforeEach(() => {
      if (typeof jest.mock === 'function') {
        jest.mock('loadjs', () => jest.fn().mockImplementation((url, settings) => {
          setTimeout(() => settings.error(), 200);
        }));
      }

      getSDK = require('./getSDK').getSDK;
    });

    afterEach(() => {
      if (typeof jest.resetModules === 'function') {
        jest.resetModules();
      }
    });

    xit('should be rejected', async () => {
      const rejectSpy = jest.fn();

      getSDK({
        name: 'DM',
        url: 'https://api.dmcdn.net/all.js',
        isLoaded: () => false,
      }).catch(rejectSpy);

      await eventually(() => {
        expect(rejectSpy).toHaveBeenCalled()
      });
    });
  });
});