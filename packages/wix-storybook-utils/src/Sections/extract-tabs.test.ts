import { extractTabs } from './extract-tabs';

import * as Section from './';

describe('extractTabs()', () => {
  it('should extract tab names from TabSection and return array', () => {
    const expectedTabs = ['first tab', 'second tab'];

    const section = Section.tab({
      title: 'root, ignored',
      sections: [
        Section.tab({
          title: expectedTabs[0],
          sections: [Section.code({ source: '"hello";' })],
        }),

        Section.tab({
          title: expectedTabs[1],
          sections: [Section.code({ source: '"hello";' })],
        }),
      ],
    });

    expect(extractTabs(section)).toEqual(expectedTabs);
  });
});
