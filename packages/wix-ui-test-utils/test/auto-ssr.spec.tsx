/**
 * @jest-environment node
 */

import React = require('react');
import MetaDataTools from '../src/meta-data-tools';
import {renderToString} from 'react-dom/server';
import {autoSSR} from '../src/auto-ssr/auto-ssr';

const TestComp: React.SFC = () => {
  return <h1>Hey person</h1>;
};

const FailingTestComp: React.SFC = () => {
  const accessDocument = () => {
    document.createElement('div');
  };

  accessDocument();
  return null;
};

describe('AutoSSR', () => {
  beforeEach(() => {
    MetaDataTools.clean();
  });

  it('should be run in an environment without document and window', () => {
    expect(() => window).toThrow();
    expect(() => document).toThrow();
  });

  it('should not blow up with a valid component', () => {
    MetaDataTools.describe(TestComp);
    expect(autoSSR).not.toThrow();
  });

  it('should throw with an invalid component', () => {
    MetaDataTools.describe(FailingTestComp);
    expect(autoSSR).toThrow();
  });
});
