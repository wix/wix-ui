import * as loadjs from 'loadjs';
import {ISDKConfig} from '../types';

const stack = {};

const loadSDK = (name, url, onLoaded, onError, onReady) => {
  loadjs(url, {
    success: () => {
      if (onReady) {
        const previousOnReady = window[onReady];

        window[onReady] = () => {
          if (previousOnReady) {
            previousOnReady();
          }
          onLoaded(window[name])
        }
      } else {
        onLoaded(window[name]);
      }
    },
    error: (err) => {
      onError(err);
    },
  });
};

const requireSDK = (name, url, onLoaded, onError, resolveRequire) => {
  // @ts-ignore
  window.require([url], sdk => {
    window[name] = resolveRequire(sdk);
    onLoaded(window[name])
  }, err => {
    onError(err);
  })
};

export function getSDK({
  name,
  url,
  onReady,
  isLoaded = () => true,
  resolveRequire = sdk => sdk,
  isRequireAllow,
}: ISDKConfig): Promise<any> {

  if (window[name] && isLoaded(window[name])) {
    return Promise.resolve(window[name])
  }

  return new Promise((resolve, reject) => {

    if (stack[url]) {
      stack[url].push(resolve);
      return;
    } else {
      stack[url] = [resolve];
    }

    const onLoaded = sdk => {
      stack[url].forEach(resolveItem => resolveItem(sdk))
    };

    // @ts-ignore
    if (isRequireAllow && typeof window.define === 'function' && window.define.amd) {
      requireSDK(name, url, onLoaded, reject, resolveRequire);
    } else {
      loadSDK(name, url, onLoaded, reject, onReady);
    }
  })
}
