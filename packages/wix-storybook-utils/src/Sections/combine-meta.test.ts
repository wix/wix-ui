import { combineMeta } from './combine-meta';

import * as Section from './';

describe('combineMeta()', () => {
  it('should extract tab data and return under `meta` property', () => {
    const expectedTabs = ['first tab', 'second tab'];

    const tabSection = (title, sections) =>
      Section.tab({
        title,
        sections,
      });

    const codeSection = source => Section.code({ source });

    const tabs = [
      tabSection(expectedTabs[0], [codeSection('"hello";')]),
      tabSection(expectedTabs[1], [codeSection('"hello";')]),
    ];

    const metadata = {
      displayName: 'test',
      props: {},
    };

    expect(combineMeta(tabs, metadata)).toEqual({
      sections: tabs,
      metadata: {
        ...metadata,
        tabs: expectedTabs,
      },
    });
  });
});
