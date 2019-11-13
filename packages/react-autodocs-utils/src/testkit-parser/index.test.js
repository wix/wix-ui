const testkitParser = require('.');

describe('testkitParser', () => {
  it('should be defined', () => {
    expect(typeof testkitParser).toEqual('function');
  });

  describe('given testkit which has spread properties', () => {
    it('should parse correctly', () => {
      const expectedOutput = {
        descriptor: [
          { args: [], name: 'method', type: 'function' },
          { args: [{ name: 'a' }, { name: 'b' }, { name: 'c' }], name: 'methodWithArguments', type: 'function' },
          {
            name: 'nested',
            type: 'object',
            props: [
              {
                args: [],
                name: 'method',
                type: 'function',
              },
            ],
          },
          { args: [], name: 'method', type: 'function' },
        ],
        file: 'driver.js',
      };

      return expect(testkitParser(__dirname + '/__fixtures__/driver.js')).resolves.toEqual(expectedOutput);
    });
  });
});
