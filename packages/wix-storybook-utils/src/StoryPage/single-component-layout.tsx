import * as React from 'react';

import { AutoTestkit } from '../AutoTestkit/auto-testkit';
import { importString } from './import-string';
import { Metadata } from '../typings/metadata';
import { StoryConfig } from '../typings/story-config';

const TabbedView = require('../TabbedView').default;
const Markdown = require('../Markdown').default;
const CodeBlock = require('../CodeBlock').default;
const AutoExample = require('../AutoExample').default;
const AutoDocs = require('../AutoDocs').default;
const Heading = require('../ui/heading').default;

const styles = require('./styles.scss');

const hasTestkitDocs = (metadata: Metadata): Boolean =>
  Boolean(metadata.readmeTestkit) ||
  (metadata.drivers &&
    metadata.drivers.some(driver => Boolean(driver.descriptor)));

const tabs: ((a: Metadata) => string[]) = metadata => [
  'Usage',
  'API',
  ...(hasTestkitDocs(metadata) ? ['Testkit'] : []),
  ...(metadata.readmeAccessibility ? ['Accessibility'] : []),
];

interface SingleComponentLayoutProps extends StoryConfig {
  activeTabId?: string;
}

export const SingleComponentLayout: React.StatelessComponent<
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
      <Markdown
        dataHook="metadata-readme"
        source={metadata.readme || `# \`<${metadata.displayName}/>\``}
      />

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

    <AutoDocs parsedSource={metadata} />

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
