const getExport = require('../get-export');

jest.mock('fs');
const fs = require('fs');

describe('import parsing', () => {
  const testCases = [
    {
      spec: 'default arrow function without block statement',
      code: `
      import driver from './driver.js';
      export default () => ({
        driver
      })`,
      files: {
        'driver.js': `export default () => ({
          method: arg => {}
        })`,
      },
    },
    {
      spec: 'default arrow function with block statement',
      code: `
      import driver from './driver.js';
      export default () => ({
        driver
      })`,
      files: {
        'driver.js': `export default () => {
           return {
             method: arg => {}
           }
        }`,
      },
    },
    {
      spec: 'default function',
      code: `
      import driver from './driver.js';
      export default () => ({
        driver
      })`,
      files: {
        'driver.js': `export default function() {
           return {
             method: arg => {}
           }
        }`,
      },
    },
    {
      spec: 'identifier in imported file',
      code: `
      import driver from './driver.js';
      export default () => ({
        driver
      })`,
      files: {
        'driver.js': `
         const symbol = {
           method: arg => {}
         };
         export default function() {
           return symbol;
         }`,
      },
    },
    {
      spec: 'named arrow function',
      code: `
      import {driver} from './driver.js';
      export default () => ({
        driver
      })`,
      files: {
        'driver.js': `
          export const driver = () => ({
            method: arg => {}
          });
          export default () => ({
            anotherMethod: () => {}
          })`,
      },
    },
    {
      spec: 'factory function',
      code: `
      import driverFactory from './driver.js';
      const driver = driverFactory();
      export default () => ({
        driver
      })`,
      files: {
        'driver.js': `
          export default () => ({
            method: arg => {}
          })`,
      },
    },
    {
      spec: 'member expression',
      code: `
      import driverFactory from './driver.js';
      export default () => ({
        driver: driverFactory().anotherDriver
      })`,
      files: {
        'driver.js': `
          export default () => ({
            anotherDriver: {
              method: arg => {}
            }
          })`,
      },
    },
    {
      spec: 'object spread on factory function',
      code: `
      import driverFactory from './driver.js';
      export default () => ({
        ...driverFactory()
      })
      `,
      files: {
        'driver.js': `
          export default () => ({
            driver: {
              method: arg => {}
            }
          })
        `,
      },
    },
    {
      spec: 'export { x as y } from z',
      code: `
        export { internalDriver as driverFactory } from './driver.js';
      `,
      files: {
        'driver.js': `
        export const internalDriver = () => ({
          driver: {
            method: arg => {}
          }
        });
        `,
      },
    },
    {
      spec: 'export { x as y } from node_modules/z',
      code: `
        export { internalDriver as driverFactory } from 'library/dist/driver.js';
      `,
      files: {
        node_modules: {
          library: {
            'driver.js': `
            export const internalDriver = () => ({
              driver: {
                method: arg => {}
              }
            });
            `,
          },
        },
      },
    },
    {
      spec: 'Multi-level imports',
      code: `
        export {
          buttonNextDriverFactory as textButtonDriverFactory,
        } from 'libraryA/dist/driver';
      `,
      files: {
        node_modules: {
          libraryA: {
            'driver.ts': `
              import { baseUniDriverFactory } from 'libraryB/driver';

              export const buttonNextDriverFactory = (base: any): any => {
                return {
                  driver: {...baseUniDriverFactory(base)}
                };
              };
            `,
          },
          libraryB: {
            'driver.js': `
              export const baseUniDriverFactory = (base: any): any => {
                return {
                  method: (arg) => {}
                };
              };
            `,
          },
        },
      },
    },
    {
      spec: 'relative path in node_modules',
      code: `
        export { buttonNextDriverFactory } from 'library/dist/driver';
      `,
      files: {
        node_modules: {
          library: {
            'driver.ts': `
              export { buttonNextDriverFactory } from './dist/src/driverFactory';
            `,
            src: {
              'driverFactory.ts': `export const buttonNextDriverFactory = (base: any): any => ({
                driver: {
                  method: (arg) => {}
                }
              });`,
            },
          },
        },
      },
    },
    {
      spec: 're-exported identifier',
      code: `
        export { buttonNextDriverFactory } from 'library/dist/driver';
      `,
      files: {
        node_modules: {
          library: {
            'driver.ts': `
              module.exports = require('./dist/src/driverFactory');
            `,
            src: {
              'driverFactory.ts': `export const buttonNextDriverFactory = (base: any): any => ({
                driver: {
                  method: (arg) => {}
                }
              });`,
            },
          },
        },
      },
    },
    {
      spec: 're-exported default as ExportNamedDeclaration',
      code: `
        export {
          default,
        } from './component';
      `,
      files: {
        'component.js': `
          export default (base: any): any => ({
            driver: {
              method: (arg) => {}
            }
          });
        `,
      },
    },
    {
      spec: 'imported identifiers in spread element',
      code: `
        import internalDriverFactory from './folder/internal.js';
        export default () => ({
          ...internalDriverFactory()
        });
      `,
      files: {
        folder: {
          'internal.js': `
            import anotherDriverFactory from './another-internal.js';
            export default () => ({
              ...anotherDriverFactory()
            });
          `,
          'another-internal.js': `
            export default () => ({
              driver: {
                method: (arg) => {}
              }
            });
          `,
        },
      },
    },
    {
      spec: 'member expression with imported spread',
      code: `
        import internalDriverFactory from './folder/internal.js';
        const internalDriver = internalDriverFactory();
        export default () => ({
          driver: {
            method: internalDriver.method
          }
        });
      `,
      files: {
        folder: {
          'internal.js': `
            import anotherDriverFactory from './another-internal.js';
            const anotherDriver = anotherDriverFactory();
            export default () => ({
              ...anotherDriver
            });
          `,
          'another-internal.js': `
            export default () => ({
              method: (arg) => {}
            });
          `,
        },
      },
    },
    {
      spec: 'imported member expression via named default export with internal spread',
      code: `
        import driverFactory from './folder/internal';
        export default () => {
          const driver = driverFactory();
          return {
            driver: { method: driver.method },
          };
        };
      `,
      files: {
        folder: {
          'internal.js': `
            export {
              default,
            } from './another-internal';
          `,
          'another-internal.js': `
            const driverFactory = () => {
              const driver = {
                method: arg => {}
              };
              return { ...driver };
            };
            export default driverFactory;
          `,
        },
      },
    },
  ];

  const expected = [
    {
      name: 'driver',
      type: 'object',
      props: [{ name: 'method', type: 'function', args: [{ name: 'arg' }] }],
    },
  ];

  testCases.forEach(({ spec, code, files }) => {
    it(`should parse ${spec}`, async () => {
      fs.__setFS(files);
      const result = await getExport(code);
      expect(result).toEqual(expected);
    });
  });
});
