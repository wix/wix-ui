import * as React from 'react';

import { AutoTestkit } from '../AutoTestkit/auto-testkit';
import { importString } from './import-string';
import { Metadata } from '../typings/metadata';
import { StoryConfig } from '../typings/story-config';

import TabbedView from '../TabbedView';
import Markdown from '../Markdown';
import CodeBlock from '../CodeBlock';
import AutoExample from '../AutoExample';
import AutoDocs from '../AutoDocs';
import Heading from '../ui/heading';

import styles from './styles.scss';

const hasTestkitDocs = (metadata: Metadata): Boolean =>
  Boolean(metadata.readmeTestkit) ||
  (metadata.drivers &&
    metadata.drivers.some(driver => Boolean(driver.descriptor)));

const tabs: (a: Metadata) => string[] = metadata => [
  'Usage',
  'API',
  ...(hasTestkitDocs(metadata) ? ['Testkit'] : []),
  ...(metadata.readmeAccessibility ? ['Accessibility'] : []),
];

interface SingleComponentLayoutProps extends StoryConfig {
  activeTabId?: string;
}

const hasTitle = (string = '') => string.startsWith('# ');

const readme = metadata => {
  const description = metadata.readme || metadata.description;
  const title = hasTitle(description)
    ? ''
    : `# \`<${metadata.displayName}/>\`\n`;
  const content = description ? `${title}${description}` : title;

  return <Markdown dataHook="metadata-readme" source={content} />;
};

export const SingleComponentLayout: React.FunctionComponent<
  SingleComponentLayoutProps
> = ({
  metadata,
  activeTabId,
  displayName,
  config,
  exampleImport,
  component,
  componentProps,
  exampleProps,
  componentWrapper,
  codeExample,
  examples,
}: SingleComponentLayoutProps) => (
  <TabbedView activeTabId={activeTabId} tabs={tabs(metadata)}>
    <div className={styles.usage}>
      {readme(metadata)}

      {(displayName || metadata.displayName) && (
        <div className={styles.githubLink}>
          <a
            href={`${config.repoBaseURL}${metadata.displayName}`}
            target="wix-style-react-storybook"
            className={styles.viewSourceLink}
          >
            View source
          </a>
        </div>
      )}

      <CodeBlock
        dataHook="metadata-import"
        source={importString({
          config,
          metadata,
          exampleImport,
        })}
      />

      <div>
        <Heading>Playground</Heading>
        <AutoExample
          component={component}
          parsedSource={metadata}
          componentProps={componentProps}
          componentWrapper={componentWrapper}
          exampleProps={exampleProps}
          codeExample={codeExample}
        />
      </div>

      {examples && (
        <div>
          <Heading>Examples</Heading>
          {examples}
        </div>
      )}
    </div>

    <div>
      {metadata.readmeApi && (
        <Markdown data-hook="api-markdown" source={metadata.readmeApi} />
      )}

      <AutoDocs parsedSource={metadata} showTitle={!metadata.readmeApi} />
    </div>

    <div>
      {metadata.readmeTestkit && (
        <Markdown
          data-hook="testkit-markdown"
          source={metadata.readmeTestkit}
        />
      )}
      {metadata.drivers && metadata.drivers.length && (
        <AutoTestkit component={metadata} />
      )}
    </div>

    {metadata.readmeAccessibility && (
      <Markdown source={metadata.readmeAccessibility} />
    )}
  </TabbedView>
);
