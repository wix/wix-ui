import { generateMeta } from './tab';

import * as Section from '../index';

describe('generateMeta()', () => {
  it('should extract tab data and return under `meta` property', () => {
    const expectedTabs = ['first tab', 'second tab'];

    const tabSection = (title, sections) =>
      Section.tab({
        title,
        sections,
      });

    const codeSection = source => Section.code({ source });

    const assert = [
      tabSection(expectedTabs[0], [codeSection('"hello";')]),
      tabSection(expectedTabs[1], [codeSection('"hello";')]),
    ];

    expect(generateMeta(assert)).toEqual({
      sections: assert,
      meta: {
        tabs: expectedTabs,
      },
    });
  });
});
