const replaceTemplates = require('../src/replace-templates');

describe('replaceTemplates', () => {
  it('should work as expected', () => {
    expect(
      replaceTemplates('This is a {%template%}', { template: 'Hey!' }),
    ).toEqual('This is a Hey!');
  });

  it('should work for multiline string', () => {
    expect(
      replaceTemplates(
        `Also for multi line {%stuff%}.
Test test {%test%} {%anotherTest%}`,
        {
          stuff: 'strings',
          test: 'hello',
          anotherTest: 'another hello',
        },
      ),
    ).toEqual(
      `Also for multi line strings.
Test test hello another hello`,
    );
  });

  it('should work for snake-case keys', () => {
    expect(
      replaceTemplates('This is {%snake-case-key%}', {
        'snake-case-key': 'working',
      }),
    ).toEqual('This is working');
  });
});
