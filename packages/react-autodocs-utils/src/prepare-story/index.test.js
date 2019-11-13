/* global describe it expect */

const prepareStory = require('./');

describe('prepareStory', () => {
  describe('given erroneous input', () => {
    it('should reject promise with message', () =>
      expect(prepareStory()()).rejects.toEqual(
        'ERROR: unable to prepare story, both `storyConfig` and `source` must be provided'
      ));
  });

  describe('with 2 curried calls', () => {
    it('should return promise', () => {
      expect(prepareStory({})('test').then).toBeDefined();
    });

    it('should reject with error when exported config is not an object', () => {
      const source = `const something = "hello";
export default something;`;

      return expect(prepareStory({})(source)).rejects.toMatch('ERROR');
    });

    it('should wrap exported object with `story()`', () => {
      const source = 'export default { a: 1 };';
      const expectation = `import story from "wix-storybook-utils/Story";

import { storiesOf } from "@storybook/react";

export default story({
  a: 1,
  _config: {
    storiesOf: storiesOf
  }
});`;

      return expect(prepareStory({})(source)).resolves.toEqual(expectation);
    });

    it('should add _config to exported object', () => {
      const source = 'export default { a: 1 };';
      const config = { a: 1 };
      const expectation = `import story from "wix-storybook-utils/Story";

import { storiesOf } from "@storybook/react";

export default story({
  a: 1,
  _config: {
    "a": 1,
    storiesOf: storiesOf
  }
});`;

      return expect(prepareStory(config)(source)).resolves.toEqual(expectation);
    });

    it('should work with referenced story config', () => {
      const source = `
        const config = { a: 1, b: { c: 'hey' } };
        export default config;
      `;
      const config = { hello: 'config!', time: { to: { say: { good: 'buy' } } } };
      const expectation = `import story from "wix-storybook-utils/Story";

import { storiesOf } from "@storybook/react";

const config = {
  a: 1,
  b: {
    c: 'hey'
  },
  _config: {
    "hello": "config!",
    "time": {
      "to": {
        "say": {
          "good": "buy"
        }
      }
    },
    storiesOf: storiesOf
  }
};
export default story(config);`;

      return expect(prepareStory(config)(source)).resolves.toEqual(expectation);
    });

    it('should work with spread properties', () => {
      const source = `
        const stuff = { thing: { moreThings: ['hello'] } };
        export default {
          a: 1,
          b: {
            ...stuff,
            c: ['d']
          }
        };
      `;

      const config = { 'i-am-config': 'yes' };

      const expectation = `import story from "wix-storybook-utils/Story";

import { storiesOf } from "@storybook/react";

const stuff = {
  thing: {
    moreThings: ['hello']
  }
};
export default story({
  a: 1,
  b: { ...stuff,
    c: ['d']
  },
  _config: {
    "i-am-config": "yes",
    storiesOf: storiesOf
  }
});`;

      return expect(prepareStory(config)(source)).resolves.toEqual(expectation);
    });

    it('should work with existing nested properties', () => {
      const source = `
        const stuff = { thing: { moreThings: ['hello'] } };
        const callMe = () => true;
        export default {
          a: 1,
          b: {
            ...stuff,
            c: ['d']
          },
          d: {
            e: {
              f: {
                hello: callMe('maybe')
              }
            }
          }
        };
      `;

      const config = {
        'i-am-config': 'yes',
        nested: {
          oh: {
            boy: {
              thing: 'hey there!',
            },
          },
        },
      };

      const expectation = `import story from "wix-storybook-utils/Story";

import { storiesOf } from "@storybook/react";

const stuff = {
  thing: {
    moreThings: ['hello']
  }
};

const callMe = () => true;

export default story({
  a: 1,
  b: { ...stuff,
    c: ['d']
  },
  d: {
    e: {
      f: {
        hello: callMe('maybe')
      }
    }
  },
  _config: {
    "i-am-config": "yes",
    "nested": {
      "oh": {
        "boy": {
          "thing": "hey there!"
        }
      }
    },
    storiesOf: storiesOf
  }
});`;

      return expect(prepareStory(config)(source)).resolves.toEqual(expectation);
    });

    it('should work with module.exports', () => {
      const source = 'module.exports = { a: 1 };';
      const config = { a: 1 };
      const expectation = `const story = require("wix-storybook-utils/Story").default;

const {
  storiesOf
} = require("@storybook/react");

module.exports = story({
  a: 1,
  _config: {
    "a": 1,
    storiesOf: storiesOf
  }
});`;

      return expect(prepareStory(config)(source)).resolves.toEqual(expectation);
    });

    it('should work with referenced module.exports', () => {
      const source = `
        const stuff = { thing: { moreThings: ['hello'] } };
        const callMe = () => true;
        const reference = {
          a: 1,
          b: {
            ...stuff,
            c: ['d']
          },
          d: {
            e: {
              f: {
                hello: callMe('maybe')
              }
            }
          }
        };

        module.exports = reference;
      `;

      const config = {
        'i-am-config': 'yes',
        nested: {
          oh: {
            boy: {
              thing: 'hey there!',
            },
          },
        },
      };

      const expectation = `const story = require("wix-storybook-utils/Story").default;

const {
  storiesOf
} = require("@storybook/react");

const stuff = {
  thing: {
    moreThings: ['hello']
  }
};

const callMe = () => true;

const reference = {
  a: 1,
  b: { ...stuff,
    c: ['d']
  },
  d: {
    e: {
      f: {
        hello: callMe('maybe')
      }
    }
  },
  _config: {
    "i-am-config": "yes",
    "nested": {
      "oh": {
        "boy": {
          "thing": "hey there!"
        }
      }
    },
    storiesOf: storiesOf
  }
};
module.exports = story(reference);`;

      return expect(prepareStory(config)(source)).resolves.toEqual(expectation);
    });
  });
});
