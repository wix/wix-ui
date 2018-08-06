import { getFixedResult, helper } from './lintRunner';

const rule = 'no-full-wsr-lib';

describe('no-full-wsr-lib', () => {
  it(`should not fail`, () => {
    const src = `import Button from 'wix-style-react/Button';`;
    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it(`should fail on a destructured import statement`, () => {
    const src = `import { Button } from 'wix-style-react';`;
    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    const failure = helper({ src, rule }).failures[0];
    expect(failure.getFailure()).toBe(
      "Wix-Style-React is imported in a way that does not support tree shaking. Use a direct import, for example: `import Button from 'wix-style-react/Button';`"
    );
  });

  it(`should fail on a destructured require statement`, () => {
    const src = `const { Button } = require('wix-style-react');`;
    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
  });

  it(`should fail on a property access require statement`, () => {
    const src = `const Button2 = require('wix-style-react').Button;`;
    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
  });

  it(`should fail on a whole lib require statement`, () => {
    const src = `const WSR = require('wix-style-react');`;
    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
  });

  it('should fix destructured import statement', () => {
    const src = `import { Button, Panel } from 'wix-style-react';`;
    const output = `import Button from 'wix-style-react/Button';\nimport Panel from 'wix-style-react/Panel';`;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(getFixedResult({ src, rule })).toEqual(output);
  });

  it('should fix destructured require statement', () => {
    const src = `const { Button } = require('wix-style-react');`;
    const output = `import Button from 'wix-style-react/Button';`;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(getFixedResult({ src, rule })).toEqual(output);
  });

  it('should fix property access require statement', () => {
    const src = `const Button2 = require('wix-style-react').Button;`;
    const output = `import Button2 from 'wix-style-react/Button';`;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(getFixedResult({ src, rule })).toEqual(output);
  });

  it('should not fix requiring all the lib', () => {
    const src = `const WSR = require('wix-style-react');`;
    const output = `const WSR = require('wix-style-react');`;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(getFixedResult({ src, rule })).toEqual(output);
  });

  describe('regression tests', () => {
    it(`should not throw an error`, () => {
      /*
        for some reason errors from ts core not thrown in tests,
        they just shown as warns, so we listen to console.warn
      */
      const spy = jest.spyOn(console, 'warn');
      const src = `let variableWithoutInit;`;
      helper({ src, rule });
      expect(spy).toHaveBeenCalledTimes(0);
      spy.mockRestore();
    });
  })
});
