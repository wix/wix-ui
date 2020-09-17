import { deepAssign } from '../test-utils/deep-assign';

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

    describe('title', () => {
      it('should be taken from displayName', () => {
        const displayName = 'best name';
        const config = storyConfig({
          metadata: {
            displayName,
          },
        });

        const [firstSection] = createDefaultSections(config);
        expect(firstSection.title).toEqual(displayName);
      });

      it('should prioritize storyName', () => {
        const storyName = 'besterer name';
        const config = storyConfig({
          storyName,
          metadata: {
            displayName: 'i should be ignored',
          },
        });

        const [firstSection] = createDefaultSections(config);
        expect(firstSection.title).toEqual(storyName);
      });
    });
  });
});
