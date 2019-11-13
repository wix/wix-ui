const getExport = require('../get-export');

describe('get default export', () => {
  const testCases = [
    {
      spec: 'export default anonymous function without block statement',
      code: `
      const a = 1;
      export default () => ({
        method: () => {}
      })`,
    },
    {
      spec: 'export default anonymous function with block statement',
      code: `
      const a = 1;
      export default () => {
        return {
          method: () => {}
        }
      }`,
    },
    {
      spec: 'export default function',
      code: `
      const a = 1;
      export default function () {
        return {
          method: () => {}
        }
      }`,
    },
    {
      spec: 'arrow function symbol without block statement',
      code: `
      const driver = () => ({
        method: () => {}
      });
      export default driver;
      `,
    },
    {
      spec: 'arrow function symbol with block statement',
      code: `
      const driver = () => {
        return {
          method: () => {}
        }
      };
      export default driver;
      `,
    },
    {
      spec: 'function declaration symbol',
      code: `
      function driver() {
        return {
          method: function() {}
        }
      };
      export default driver;
      `,
    },
    {
      spec: 'returned identifier',
      code: `
      function driver() {
        const a = {
          method: function() {}
        }; 
        return a;
      };
      export default driver;
      `,
    },
    {
      spec: 'call expression in arrow function body',
      code: `
        const internalDriverFactory = () => ({ 
          method: () => {}  
        });
        const driverFactory = () => internalDriverFactory();
        
        export default driverFactory;
      `,
    },
  ];

  const expected = [{ name: 'method', type: 'function', args: [] }];

  testCases.forEach(({ spec, code }) => {
    it(`should parse ${spec}`, async () => {
      const result = await getExport(code);
      expect(result).toEqual(expected);
    });
  });
});

describe('get named export', () => {
  const testCases = [
    {
      spec: 'const DriverFactory pattern',
      code: `
        export const myDriverFactory = () => ({
          method: function() {}
        });
      `,
    },
    {
      spec: 'identifier DriverFactory pattern',
      code: `
        const myDriverFactory = () => ({
          method: function() {}
        });
        export { myDriverFactory as driver }
      `,
    },
    {
      spec: 'single named export',
      code: `
        const myFactory = () => ({
          method: function() {}
        });
        export { myFactory }
      `,
    },
  ];
  const expected = [{ name: 'method', type: 'function', args: [] }];
  testCases.forEach(({ spec, code }) => {
    it(`shoud parse ${spec}`, async () => {
      const result = await getExport(code);
      expect(result).toEqual(expected);
    });
  });

  it('shoud fail parsing given multiple named exports without DriverFactory pattern', async () => {
    const code = `
    const myFactory = () => ({
      method: function() {}
    });
    const anotherFactory = () => ({ })
    export { myFactory, anotherFactory }
    `
    
    await expect(getExport(code)).rejects.toEqual(Error('export "default" not found'));
  });
});
