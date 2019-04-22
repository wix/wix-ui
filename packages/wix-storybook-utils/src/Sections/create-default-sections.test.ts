import { deepAssign } from '../../test/utils/deep-assign';

import { SectionType, HeaderSection } from '../typings/story-section';
import { createDefaultSections } from './create-default-sections';

import { header } from '.';

const storyConfig = (config = {}) =>
  deepAssign(
    {
      config: {},
      metadata: {},
      exampleImport: {},
      examples: {},
    },
    config,
  );

describe('createDefaultSection', () => {
  describe('header section', () => {
    it('should be first one', () => {
      const [firstSection] = createDefaultSections(storyConfig());
      expect(firstSection.type).toEqual(SectionType.Header);
    });

    it('should merge config from sections', () => {
      const headerConfig = {
        issueUrl: 'hello',
        sourceUrl: 'from',
        component: 'test',
      };

      const [firstSection] = createDefaultSections(
        storyConfig({ sections: [header(headerConfig)] }),
      );

      expect(firstSection).toEqual(expect.objectContaining(headerConfig));
    });

    it('should display sourceUrl for component stories', () => {
      const config = storyConfig({
        metadata: {
          displayName: 'name',
        },
        config: {
          repoBaseURL: 'base/',
        },
      });

      const [firstSection] = createDefaultSections(config);

      expect((firstSection as HeaderSection).sourceUrl).toEqual('base/name');
    });
  });
});
