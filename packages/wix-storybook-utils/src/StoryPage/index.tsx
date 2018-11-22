import * as React from 'react';
import { AutoTestkit } from '../AutoTestkit/auto-testkit';

import { Metadata } from '../typings/metadata';
import { Config } from '../typings/config';

const TabbedView = require('../TabbedView').default;
const Markdown = require('../Markdown').default;
const CodeBlock = require('../CodeBlock').default;
const AutoExample = require('../AutoExample').default;
const AutoDocs = require('../AutoDocs').default;
const omit = require('../AutoExample/utils/omit').default;

const styles = require('./styles.scss');

const tabs = metadata => [
  'Usage',
  'API',
  ...(metadata.readmeTestkit || (metadata.drivers && metadata.drivers.length)
    ? ['Testkit']
    : []),
  ...(metadata.readmeAccessibility ? ['Accessibility'] : []),
];

interface ImportString {
  metadata: Metadata;
  config: Config;
  exampleImport: string;
}

const importString: (ImportString) => string = ({
  metadata,
  config,
  exampleImport,
}: ImportString) =>
  [
    {
      when: () => exampleImport,
      make: () => exampleImport,
    },
    {
      when: () => config.importFormat,
      make: () =>
        config.importFormat
          .replace(/%componentName/g, metadata.displayName)
          .replace(
            new RegExp('%(' + Object.keys(config).join('|') + ')', 'g'),
            (match, configKey) => config[configKey] || '',
          ),
    },
    {
      // default
      when: () => true,
      make: () =>
        `import ${metadata.displayName} from '${config.moduleName}/${
          metadata.displayName
        }';`,
    },
  ]
    .filter(({ when }) => when())[0]
    .make();

interface SectionProps {
  title: string;
  children: any;
}

const Section: React.StatelessComponent<SectionProps> = ({
  title,
  children,
}: SectionProps) => (
  <div>
    {/* tslint: disable */}
    <Markdown source={`## ${title}`} />
    {children}
    {/* tslint: enable */}
  </div>
);

interface StoryPageProps {
  metadata: Metadata;
  config: Config;
  component: any;
  componentProps: any;
  componentWrapper: any;
  hiddenProps: string[];
  displayName: string;
  exampleProps: any;

  /** custom string to be displayed in place of import example
   * usually something like `import Component from 'module/Component';`
   */
  exampleImport: string;
  examples: any;

  /** currently only `false` possible. later same property shall be used for configuring code example */
  codeExample: boolean;
  activeTabId?: string;
}

const StoryPage: React.StatelessComponent<StoryPageProps> = ({
  metadata,
  config,
  component,
  componentProps,
  componentWrapper,
  hiddenProps,
  displayName,
  exampleProps,
  exampleImport,
  examples,
  codeExample,
  activeTabId,
}: StoryPageProps) => {
  const visibleDisplayName = displayName || metadata.displayName;
  const visibleMetadata = {
    ...metadata,
    displayName: visibleDisplayName,
    props: omit(metadata.props)(prop => hiddenProps.includes(prop)),
  };

  return (
    <TabbedView activeTabId={activeTabId} tabs={tabs(metadata)}>
      <div className={styles.usage}>
        <Markdown
          dataHook="metadata-readme"
          source={metadata.readme || `# \`<${visibleDisplayName}/>\``}
        />

        {(displayName || metadata.displayName) && (
          <div className={styles.githubLink}>
            <a
              href={`${config.repoBaseURL}${visibleDisplayName}`}
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
            metadata: visibleMetadata,
            exampleImport,
          })}
        />

        <Section title="Playground">
          <AutoExample
            component={component}
            parsedSource={visibleMetadata}
            componentProps={componentProps}
            componentWrapper={componentWrapper}
            exampleProps={exampleProps}
            codeExample={codeExample}
          />
        </Section>

        {examples && <Section title="Examples">{examples}</Section>}
      </div>

      <AutoDocs parsedSource={visibleMetadata} />

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
};

StoryPage.defaultProps = {
  config: {
    importFormat: '',
    moduleName: '',
    repoBaseURL: '',
  },
  hiddenProps: [],
};

export default StoryPage;
