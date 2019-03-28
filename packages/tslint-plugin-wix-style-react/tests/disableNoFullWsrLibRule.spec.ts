import * as path from 'path';
import { getFixedResult, helper } from '../src/lintRunner';

const rule = 'no-full-wsr-lib';
const rulesDirectory = path.resolve(__dirname, '../src');

describe('Disable no-full-wsr-lib if WSR version is greater than 5.8.1', () => {
  const base = path.resolve(__dirname, 'fixtures', 'disableNoFullWsrLibRule');
  let cwd: string;

  beforeEach(() => {
    cwd = process.cwd();
    process.chdir(base);
  });

  afterEach(() => {
    process.chdir(cwd);
  });

  it(`should not fail`, () => {
    const src = `import { Button } from 'wix-style-react';`;
    const result = helper({ src, rule, rulesDirectory });
    expect(result.errorCount).toBe(0);
  });

  it(`should fail on a destructured require statement`, () => {
    const src = `const { Button } = require('wix-style-react');`;
    const result = helper({ src, rule, rulesDirectory });
    expect(result.errorCount).toBe(1);
  });

  it(`should fail on a property access require statement`, () => {
    const src = `const Button2 = require('wix-style-react').Button;`;
    const result = helper({ src, rule, rulesDirectory });
    expect(result.errorCount).toBe(1);
  });

  it(`should fail on a whole lib require statement`, () => {
    const src = `const WSR = require('wix-style-react');`;
    const result = helper({ src, rule, rulesDirectory });
    expect(result.errorCount).toBe(1);
  });

  it('should not fail for destructured import statement', () => {
    const src = `import { Button, Panel } from 'wix-style-react';`;

    const result = helper({ src, rule, rulesDirectory });
    expect(result.errorCount).toBe(0);
  });

  it('should fix destructured require statement', () => {
    const src = `const { Button } = require('wix-style-react');`;
    const output = `import Button from 'wix-style-react/Button';`;

    const result = helper({ src, rule, rulesDirectory });
    expect(result.errorCount).toBe(1);
    expect(getFixedResult({ src, rule, rulesDirectory })).toEqual(output);
  });

  it('should fix property access require statement', () => {
    const src = `const Button2 = require('wix-style-react').Button;`;
    const output = `import Button2 from 'wix-style-react/Button';`;

    const result = helper({ src, rule, rulesDirectory });
    expect(result.errorCount).toBe(1);
    expect(getFixedResult({ src, rule, rulesDirectory })).toEqual(output);
  });

  it.only('should not fix requiring all the lib', () => {
    const src = `const WSR = require('wix-style-react');`;
    const output = `const WSR = require('wix-style-react');`;

    const result = helper({ src, rule, rulesDirectory });
    expect(result.errorCount).toBe(1);
    expect(getFixedResult({ src, rule, rulesDirectory })).toEqual(output);
  });

  describe('regression tests', () => {
    it(`should not throw an error`, () => {
      /*
        for some reason errors from ts core not thrown in tests,
        they just shown as warns, so we listen to console.warn
      */
      const spy = jest.spyOn(console, 'warn');
      const src = `let variableWithoutInit;`;
      helper({ src, rule, rulesDirectory });
      expect(spy).toHaveBeenCalledTimes(0);
      spy.mockRestore();
    });
  })
});
