import * as React from 'react';
import {render} from 'react-dom';
import {BaseUniDriver} from '../base-driver';
import {UniDriver} from 'unidriver';
import {reactUniDriver} from 'unidriver/react';

export type UniDriverFactory<TDriver extends BaseUniDriver> = (base: UniDriver) => TDriver;

function componentFactory(Component: React.ReactElement<any>): UniDriver {
  const wrapperDiv = document.createElement('div');
  render(Component, wrapperDiv);
  const base = reactUniDriver(wrapperDiv.childNodes[0] as Element);
  return base;
}

export function createUniDriverFactory<TDriver extends BaseUniDriver>(driverFactory: UniDriverFactory<TDriver>) {
  return (Component: React.ReactElement<any>) => driverFactory(componentFactory(Component));
}
