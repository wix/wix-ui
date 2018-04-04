import Testkit from './index.testkit';

const testkit = new Testkit();

describe('StoryPage', () => {
  it('should render readme', () => {
    testkit.when.created();
    expect(testkit.get.readme().prop('source')).toMatch(/componentName/);
  });

  describe('given `exampleImport`', () => {
    it('should render it', () => {
      const exampleImport = 'hello there';
      testkit.when.created({exampleImport});
      expect(testkit.get.import()).toMatch(exampleImport);
    });
  });
});
