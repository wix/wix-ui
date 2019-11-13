const getExport = require('../get-export');

describe('get method comments', () => {
  const testCases = [
    {
      spec: 'line comment',
      code: `
      export default () => ({
        // method description within single line
        method: () => {}
      })`,
      expected: [{ name: 'method', type: 'function', args: [], description: 'method description within single line' }],
    },
    {
      spec: 'block comment',
      code: `
      export default () => ({
        /** method description within block */
        method: () => {}
      })`,
      expected: [{ name: 'method', type: 'function', args: [], description: 'method description within block' , tags: []}],
    },
    {
      spec: 'multi-line block comment',
      code: `
      export default () => ({
        /** 
         * method description within block 
         */
        method: () => {}
      })`,
      expected: [{ name: 'method', type: 'function', args: [], description: 'method description within block', tags: [] }],
    },
    {
      spec: 'multiple comments',
      code: `
      export default () => ({
        // method description
        /** within multiple comments */
        method: () => {}
      })`,
      expected: [
        {
          name: 'method',
          type: 'function',
          args: [],
          description: `method description
within multiple comments`,
        },
      ],
    },
    {
      spec: 'annotation: deprecated',
      code: `
      export default () => ({
        /**
         * Focus related testing is done in e2e tests only.
         * @deprecated
         */
        method: () => {}
      })`,
      expected: [
        {
          name: 'method',
          type: 'function',
          args: [],
          description: 'Focus related testing is done in e2e tests only.',
          isDeprecated: true,
          tags: [{description: null, title: 'deprecated'}]
        },
      ],
    },
    {
      spec: 'object method comment',
      code: `
      export default () => ({
        // comment
        method() {
        
        }
      })`,
      expected: [{ name: 'method', type: 'function', args: [], description: 'comment' }],
    },
  ];

  testCases.forEach(({ spec, code, expected }) => {
    it(`should parse ${spec}`, async () => {
      const result = await getExport(code);
      expect(result).toEqual(expected);
    });
  });

  describe('jsdoc tags', () => {
    it('@param', async () => {
      const result = await getExport(`
      export default () => ({
        /** 
         * method description within block 
         * @param {string} txt a param description
         */
        method: () => {}
      })`);
      expect(result).toEqual([{
        name: 'method',
        type: 'function',
        args: [],
        description: 'method description within block' ,
        tags: [{
          title: 'param',
          name: 'txt',
          description : 'a param description',
          type: {name: 'string', type: 'NameExpression'}
        }]
      }]);
    });

    it('@returns', async () => {
      const result = await getExport(`
      export default () => ({
        /** 
         * method description within block 
         * @returns {boolean} true or false
         */
        method: () => {}
      })`);
      expect(result).toEqual([{
        name: 'method',
        type: 'function',
        args: [],
        description: 'method description within block' ,
        tags: [{
          title: 'returns',
          description : 'true or false',
          type: {name: 'boolean', type: 'NameExpression'}
        }]
      }]);
    });
  })
  
});
