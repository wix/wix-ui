import { StorySection } from '../typings/story-section';
import { StoryConfig } from '../typings/story-config';

import { isE2E } from '../utils';

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

export const createDefaultSections: (a: StoryConfig) => StorySection[] = ({
  config,
  metadata,
  exampleImport,
  examples,
}) => [
  // TODO: get rid of isE2E nonsense once we stop using docs for e2e
  ...given(!isE2E)(header({ dataHook: 'section-header' })),

  tabs([
    tab({
      title: 'Usage',
      sections: [
        importExample({
          source: importString({ config, metadata, exampleImport }),
          dataHook: 'metadata-import',
        }),
        description({
          text: metadata.readme || metadata.description,
          dataHook: 'metadata-readme',
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
        testkit(),
        ...given(metadata.readmeTestkit)(
          description({
            text: metadata.readmeTestkit,
            dataHook: 'testkit-markdown',
          }),
        ),
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
