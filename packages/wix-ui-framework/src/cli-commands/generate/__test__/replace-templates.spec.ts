import { replaceTemplates } from '../tasks/replace-templates';

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

  describe('ejs', () => {
    it('should be supported', () => {
      const template = `Hello <%= utils.toPascal(who) %>! <% if(flag) { %>how are <%= ['y', 'o', 'u'].join('') %><% } %>`;

      const scope = {
        who: 'bat-man',
        flag: true,
      };

      const output = replaceTemplates(template, scope);

      const expected = `Hello BatMan! how are you`;

      expect(output).toEqual(expected);
    });
  });
});
