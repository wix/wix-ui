import { StorySection } from '../typings/story-section';
import { StoryConfig } from '../typings/story-config';

import {
  header,
  tabs,
  tab,
  description,
  importExample,
  api,
  playground,
  testkit,
} from '.';

import { importString } from '../StoryPage/import-string';

const given = expr => item => (expr ? [item] : []);

const getHeader = sections => sections[0] || {};

const getSourceUrl = ({
  config: { repoBaseURL = '' },
  metadata: { displayName },
}) => (repoBaseURL && displayName ? `${repoBaseURL}${displayName}` : undefined);

export const createDefaultSections: (a: StoryConfig) => StorySection[] = ({
  config,
  metadata,
  exampleImport,
  examples,
  storyName,
  sections = [],
}) => [
  header({
    dataHook: 'section-header',
    sourceUrl: getSourceUrl({ config, metadata }),
    title: storyName || metadata.displayName,
    ...getHeader(sections),
  }),

  tabs([
    tab({
      title: 'Usage',
      sections: [
        ...given(metadata.readme || metadata.description)(
          description({
            title: 'Description',
            text: metadata.readme || metadata.description,
            dataHook: 'metadata-readme',
          }),
        ),

        importExample({
          source: importString({ config, metadata, exampleImport }),
          dataHook: 'metadata-import',
        }),

        playground(),

        ...given(!!examples)(examples),
      ],
    }),

    tab({
      title: 'API',
      sections: [
        ...given(metadata.readmeApi)(
          description({ text: metadata.readmeApi, dataHook: 'api-markdown' }),
        ),
        api(),
      ],
    }),

    tab({
      title: 'Testkit',
      sections: [
        ...given(metadata.readmeTestkit)(
          description({
            text: metadata.readmeTestkit,
            dataHook: 'testkit-markdown',
          }),
        ),
        testkit(),
      ],
    }),

    ...given(metadata.readmeAccessibility)(
      tab({
        title: 'Accessibility',
        sections: [description(metadata.readmeAccessibility)],
      }),
    ),
  ]),
];
