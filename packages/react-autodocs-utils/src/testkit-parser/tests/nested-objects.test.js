const getExport = require('../get-export');

describe('nested object parsing', () => {
  const testCases = [
    {
      spec: 'inline',
      code: `
      export default () => ({
        driver: {
          method: () => {}
        }
      })`,
      expected: [
        {
          name: 'driver',
          type: 'object',
          props: [{ name: 'method', type: 'function', args: [] }],
        },
      ],
    },
    {
      spec: 'symbol',
      code: `
      const driver = {
        method: () => {}
      };
      export default () => ({
        driver
      })`,
      expected: [
        {
          name: 'driver',
          type: 'object',
          props: [{ name: 'method', type: 'function', args: [] }],
        },
      ],
    },
    {
      spec: 'mixed inline & symbol',
      code: `
      const driver = {
        method: () => {}
      };
      export default () => ({
        wrapper: {
          driver
        }
      })`,
      expected: [
        {
          name: 'wrapper',
          type: 'object',
          props: [
            {
              name: 'driver',
              type: 'object',
              props: [{ name: 'method', type: 'function', args: [] }],
            },
          ],
        },
      ],
    },
    {
      spec: 'mixed inline & symbol with spreading',
      code: `
      const anotherDriver = {
        method: () => {}
      };
      const driver = {
        ...anotherDriver
      };
      export default () => ({
        wrapper: {
          driver
        }
      })`,
      expected: [
        {
          name: 'wrapper',
          type: 'object',
          props: [
            {
              name: 'driver',
              type: 'object',
              props: [{ name: 'method', type: 'function', args: [] }],
            },
          ],
        },
      ],
    },
    {
      spec: 'identifier in function scope',
      code: `
      export default () => {
        const driver = {
          method: () => {}
        }
        return {
          driver
        }
      }`,
      expected: [
        {
          name: 'driver',
          type: 'object',
          props: [{ name: 'method', type: 'function', args: [] }],
        },
      ],
    },
    {
      spec: 'member expression function',
      code: `
        const driver = {
          method: () => {}
        };
        export default () => {
          return {
            driver: {
              method: driver.method
            }
          }
        };
      `,
      expected: [
        {
          name: 'driver',
          type: 'object',
          props: [{ name: 'method', type: 'function', args: [] }],
        }
      ]
    }
  ];

  testCases.slice(testCases.length - 1).forEach(({ spec, code, expected }) => {
    it(`should parse ${spec}`, async () => {
      const result = await getExport(code);
      expect(result).toEqual(expected);
    });
  });
});
